const aggregateUser = async (radiksData, req) => {
  const result = await radiksData.findOne({
    _id: req.params._id,
    radiksType: 'BlockstackUser',
  })

  return result;
}

module.exports = aggregateUser
