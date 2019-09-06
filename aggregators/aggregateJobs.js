const { COLLECTION } = require('radiks-server/app/lib/constants');

const aggregateJobs = async (radiksData, query) => {
  console.log(query, 'query')
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

  const limit = {
    $limit: parsedLimit || 5
  }

  const pipeline = [match, sort, skip, limit]

  const jobs = await radiksData.aggregate(pipeline).toArray()

  return jobs
}

module.exports = aggregateJobs