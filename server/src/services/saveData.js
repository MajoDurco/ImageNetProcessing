const mongo = require('../mongo')
const Node = require('../models/node')
const { linearNodes, parsedData } = require('../linearData')

async function saveData() {
  const parsedXml = await parsedData()
  const linearData = linearNodes(parsedXml.ImageNetStructure.synset[0], null)
  Node.deleteMany() // delete all
  return Node.insertMany(linearData)
}

module.exports = {
  saveData,
}
