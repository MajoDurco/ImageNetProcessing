const express = require('express')
const mongo = require('./mongo')

const rootRouter = express.Router()

const { saveData } = require('./services/saveData')
const { loadData } = require('./services/loadData')

rootRouter.get('/', async (req, res) => {
  try {
    const treeData = await loadData()
    res.send(treeData)
  } catch (err) {
    console.error(err)
    res.status(500)
    res.send('Could not load the data from DB')
  }
})

rootRouter.get('/save', async (req, res) => {
  try {
    saveData()
    res.send("Data were saved")
  } catch (err) {
    console.error(err)
    res.status(500)
    res.send('Could not save the data to DB')
  }
})

module.exports = rootRouter
