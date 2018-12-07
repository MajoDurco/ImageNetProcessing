const data = require('./o.json')

const PATH_SEPARATOR = ' > '

function head(array) {
  return array.length > 1 ? array[0]: null
}

function splitNamePath(namePath) {
  return namePath.split(PATH_SEPARATOR)
}

function getParentAndMyName(pathNames) {
  return splitNamePath(pathNames).slice(-2)
}

function createNewNode(name, size, childrens=true) {
  const newNode = { name, size }
  return childrens
    ? { ...newNode, children: [] }
    : newNode
}

function makeTree(data) {
  if (data.length === 0) return {}
  const [ rootNode, ...tail ] = data
  const [ rootName, rootSize ] = rootNode
  const tree = { name: rootName, size: rootSize, children: [] }
  const nodeRefs = {}
  nodeRefs[rootName] = tree
  for (let node of tail) {
    const [names, size] = node
    const [ parent, nodeName ] = getParentAndMyName(names)
    const newNode = size
      ? createNewNode(nodeName, size)
      : createNewNode(nodeName, size, false)
    const parentNode = nodeRefs[parent]
    parentNode.children.push(newNode)
    nodeRefs[nodeName] = newNode
  }
  return [{...tree}, Object.values({...nodeRefs})]
}

console.log(JSON.stringify(makeTree(data), null, 2))