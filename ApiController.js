const express = require('express');
const { decorateApp } = require('@awaitjs/express');
const { COLLECTION } = require('radiks-server/app/lib/constants');
const aggregateJobs = require('./aggregators/aggregateJobs')

const makeApiController = (db) => {
  const Router = decorateApp(express.Router());
  const radiksData = db.collection(COLLECTION);

  Router.getAsync('/jobs', async(req, res) => {
    let jobs = await aggregateJobs(radiksData, req.query)
    res.json({ jobs })
  })
}

module.exports = makeApiController;
