function getSortablePageByQuery(query = {}) {
  return { 
      limit: query && parseInt(query.limit) || 20,
      offset: query && parseInt(query.offset) || 0,
      sortBy: query && query.sortBy || null,
      sortOrder: query && query.sortOrder === 'desc' ? 'desc' : 'asc'
    };
}

function getPageWithSearchByQuery(query = {}) {
  return { 
      limit: query && parseInt(query.limit) || 20,
      offset: query && parseInt(query.offset) || 0,
      searchText: query.searchText || ''
    };
}

module.exports = {
    getSortablePageByQuery,
    getPageWithSearchByQuery
};
