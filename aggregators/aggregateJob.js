const aggregateJob = async (radiksData, req) => {
  const result = await radiksData.findOne({
    _id: req.params._id,
  })

  console.log(result);
  return result;
}

module.exports = aggregateJob
