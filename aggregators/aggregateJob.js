const aggregateJob = async (radiksData, req) => {
  const result = await radiksData.findOne({
    _id: req.params._id,
  })

  return result;
}

module.exports = aggregateJob
