const { PATH_SEPARATOR } = require('./constants')

function head(array) {
  return array.length > 1 ? array[0]: null
}

function splitNamePath(namePath) {
  return namePath.split(PATH_SEPARATOR)
}

function getParentAndMyName(pathNames) {
  return splitNamePath(pathNames).slice(-2)
}

function createNewNode(id, name, size, childrens=true) {
  const newNode = { id, name, size }
  return childrens
    ? { ...newNode, children: [] }
    : newNode
}

function makeTree(data) {
  if (data.length === 0) return {}
  const [ rootNode, ...tail ] = data
  const { name: rootName, size: rootSize, _id: rootId } = rootNode
  const tree = { id: rootId, name: rootName, size: rootSize, children: [] }
  const nodeRefs = {}
  nodeRefs[rootName] = tree
  for (let node of tail) {
    const { _id: nodeId, name: nodePath, size: nodeSize } = node
    const [ parentName, nodeName ] = getParentAndMyName(nodePath)
    const newNode = nodeSize
      ? createNewNode(nodeId, nodeName, nodeSize)
      : createNewNode(nodeId, nodeName, nodeSize, false)
    const parentNode = nodeRefs[parentName]
    parentNode.children.push(newNode)
    nodeRefs[nodeName] = newNode
  }
  return {...tree}
}

module.exports = {
  makeTree
}