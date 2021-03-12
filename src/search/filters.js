export const generateFilter = (query, allResults, filtersState, fixedFilter) => {
  const filters = Object
    .values(filtersState)
    .filter(filterItem => filterItem.selected.length > 0 && filterItem.filter.onProperty !== '__typename')
    .map(filterItem => {
      if (filterItem.filter.searchType) {
        return {
          [filterItem.filter.onProperty]: { identifier_in: filterItem.selected },
        };
      }

      return {
        [`${filterItem.filter.onProperty}_in`]: filterItem.selected,
      };
    });

  if (query) {
    // get the 50 best matching results
    const includedIdentifiers = allResults
      .sort((a, b) => b._searchScore - a._searchScore)
      .map(item => item.identifier)
      .slice(0, 50);

    filters.push({ identifier_in: includedIdentifiers });
  }

  // fixed filter from config
  if (fixedFilter) {
    filters.push(fixedFilter);
  }

  if (filters.length === 1) {
    return { ...filters[0] };
  } else if (filters.length > 1) {
    return { AND: filters };
  }

  return {};
};
