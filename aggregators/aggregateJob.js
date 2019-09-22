const aggregateJob = async (radiksData, req) => {
  const result = await radiksData.findOne({
    _id: req.params._id,
    radiksType: 'Job',
  })

  return result;
}

module.exports = aggregateJob
