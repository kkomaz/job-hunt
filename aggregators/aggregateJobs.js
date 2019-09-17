const { COLLECTION } = require('radiks-server/app/lib/constants');

const aggregateJobs = async (radiksData, query) => {
  const match = {
    $match: {
      radiksType: 'Job',
    }
  }

  const sort = {
    $sort: { createdAt: query.sort || - 1 }
  }

  const skip = {
    $skip: query.skip || 0
  }

  const parsedLimit = parseInt(query.limit)

  const facet = {
    $facet: {
      metadata: [ { $count: "total" }, { $addFields: { page: parseInt(query.page) || 0 } } ],
      data: [ { $skip: query.skip || 0 }, { $limit: parsedLimit || 2 } ]
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