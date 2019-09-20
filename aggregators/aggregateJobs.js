const aggregateJobs = async (radiksData, query) => {
  const size = 5;
  const match = {
    $match: {
      radiksType: 'Job',
    }
  }

  const sort = {
    $sort: { createdAt: query.sort || - 1 }
  }

  const parsedLimit = parseInt(query.limit) || size
  const pageNumber = parseInt(query.page);
  const currentPage = !pageNumber || pageNumber === 1 ? 1 : query.page

  const facet = {
    $facet: {
      metadata: [ { $count: "total" }, { $addFields: { page: parseInt(query.page) || 0 } } ],
      data: [ { $skip: (parsedLimit * (currentPage - 1)) }, { $limit: parsedLimit } ]
    }
  }

  const pipeline = [match, sort, facet]
  const jobs = await radiksData.aggregate(pipeline).toArray()
  const result = jobs[0]

  return {
    metadata: result.metadata[0],
    data: result.data,
  }
}

module.exports = aggregateJobs