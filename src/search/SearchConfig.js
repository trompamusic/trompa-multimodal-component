import { generateFilter } from './filters';

class SearchConfig {
  searchTypes = undefined;
  filter = undefined;

  constructor({ searchTypes, fixedFilter }) {
    this.searchTypes = searchTypes || [];
    this.filter      = fixedFilter || {};
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
        query: searchType.preprocessQuery ? searchType.preprocessQuery(query) : query,
      },
    });

    let processedAllResults = allResults;

    if (typeof searchType.processSearchResult === 'function') {
      processedAllResults = searchType.processSearchResult(allResults);
    }

    const { data: { results } } = await client.query({
      query    : searchType.searchQuery,
      variables: {
        filter: generateFilter(query, processedAllResults, filtersState, this.filter),
      },
    });

    let processedResults = results;

    if (typeof searchType.processSearchResult === 'function') {
      processedResults = searchType.processSearchResult(results);
    }

    return {
      typename  : searchType.name,
      total     : processedResults.length,
      allResults: processedAllResults,
      results   : processedResults,
    };
  }

  async buildSearchResults(client, query, filtersState) {
    const typeFilterState   = filtersState['Type'];
    const searchTypeResults = await Promise.all(this.searchTypes
      .filter(searchType => {
        return !typeFilterState || typeFilterState.selected.length === 0 || typeFilterState.selected.includes(searchType.name);
      })
      .map(searchType => this.performSearch(searchType, client, query, filtersState)));

    const searchScores = Object.fromEntries(searchTypeResults
      .reduce((acc, typeResult) => {
        return acc.concat(typeResult.allResults);
      }, [])
      .map(item => [item.identifier, item._searchScore]));

    const flattenedResults = searchTypeResults
      .reduce((acc, typeResult) => {
        return acc.concat(typeResult.results);
      }, [])
      .map(item => {
        item._searchScore = searchScores[item.identifier];

        return item;
      })
      .sort((a, b) => b._searchScore - a._searchScore);

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
