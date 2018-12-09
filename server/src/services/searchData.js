const mongo = require('../mongo')
const Node = require('../models/node')
const { linearNodes, parsedData } = require('../linearData')

async function searchData(query) {
  if ('name' in query) return searchByName(query.name)
  if ('parent' in query) return searchByParent(query.parent)
}

async function searchByName(name) {
  return Node.find({ name: new RegExp(inputText, 'i' ) }, null, { limit: 50 })
}

async function searchByParent(parentName) {
  return Node.find({ parent: parentName })
}

module.exports = {
  searchData,
}
