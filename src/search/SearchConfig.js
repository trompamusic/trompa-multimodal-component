import { generateFilter } from './filters';

class SearchConfig {
  searchTypes = [];
  fixedFilter = undefined;

  constructor({ searchTypes, fixedFilter }) {
    this.searchTypes = searchTypes || [];
    this.fixedFilter = fixedFilter;
  }

  async buildFilters(client, filtersState, searchTypeResults) {
    const filters = [];

    if (this.searchTypes.length > 1) {
      filters.push({
        name      : 'Type',
        onProperty: '__typename',
        options   : this.searchTypes.map(searchType => ({ value: searchType.name, label: searchType.name })),
      });
    }

    this.searchTypes.forEach(searchType => {
      searchType.filters.forEach(filter => {
        const existingFilter = filters.find(item => item.onProperty === filter.onProperty);

        if (!existingFilter) {
          filters.push({ ...filter });
        } else if (existingFilter.options && filter.options) {
          existingFilter.options = existingFilter.options.concat(filter.options);
        }
      });
    });

    return Promise.all(filters.map(async filter => {
      const query = filtersState[filter.name]?.search || '';

      if (filter.searchType) {
        const { data: { allResults } } = await client.query({
          query    : filter.searchType.searchAllQuery,
          variables: { query, first: 10 },
        });

        return { ...filter, options: allResults.map(item => ({ value: item.identifier, label: item.name })) };
      }

      // combine all options
      if (!filter.options) {
        const options = searchTypeResults
          .reduce((acc, results) => {
            return acc.concat(results.allResults);
          }, [])
          .reduce((acc, result) => {
            if (result[filter.onProperty] && !acc.includes(result[filter.onProperty])) {
              return acc.concat(result[filter.onProperty]);
            }

            return acc;
          }, [])
          .map(value => ({ label: value, value }));

        return { ...filter, options };
      }

      return filter;
    }));
  }

  async performSearch(searchType, client, query, filtersState) {
    const { data: { allResults } } = await client.query({
      query    : searchType.searchAllQuery,
      variables: {
        query,
      },
    });

    const { data: { results } } = await client.query({
      query    : searchType.searchQuery,
      variables: {
        filter: generateFilter(query, allResults, filtersState, this.fixedFilter),
      },
    });

    return {
      typename: 'AudioObject',
      total   : results.length,
      allResults,
      results,
    };
  }

  async buildSearchResults(client, query, filtersState) {
    const searchTypeResults = await Promise.all(this.searchTypes
      .filter(searchType => {
        if (!filtersState['Type']) {
          return true;
        }

        return filtersState['Type'].selected.length === 0 || filtersState['Type'].selected.includes(searchType.name);
      })
      .map(searchType => this.performSearch(searchType, client, query, filtersState)));

    const flattenedResults = searchTypeResults.reduce((acc, typeResult) => {
      return acc.concat(typeResult.results);
    }, []);

    const total = searchTypeResults.reduce((acc, typeResult) => {
      return acc + typeResult.total;
    }, 0);

    const filters = await this.buildFilters(client, filtersState, searchTypeResults);

    return {
      filters,
      flattenedResults,
      total,
    };
  }
}

export default SearchConfig;
