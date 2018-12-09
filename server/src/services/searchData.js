const mongo = require('../mongo')
const Node = require('../models/node')
const { linearNodes, parsedData } = require('../linearData')

async function searchData(inputText) {
  const searchResult = await Node.find({ name: new RegExp(inputText, 'i' ) }, null, { limit: 50 })
  return searchResult
}

module.exports = {
  searchData,
}
