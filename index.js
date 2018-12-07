const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js')
const data = require('./o.json')

// const parser = new xml2js.Parser();
// const content = fs.readFileSync(path.resolve(__dirname, 'structure_released.xml'))
// const result = parser.parseString(content, (err, result) => {
//   const x = preorderNodes(result.ImageNetStructure.synset[0], null)
//   console.log(JSON.stringify(x, null, 2))
// })

function preorderNodes(node, nameFromAbove) {
  let nameFromRoot = [nameFromAbove, node['$'].words].join(' > ')
  if(!nameFromAbove) nameFromRoot = node['$'].words // initial call
  let data = [{
    name: nameFromRoot,
    size: 0,
  }]
  let [ dataHead ] = data;
  if ('synset' in node) {
    dataHead.size += node.synset.length
    for (let deeperNode of node.synset) {
      const dataFromBelow = preorderNodes(deeperNode, nameFromRoot)
      const [ head ] = dataFromBelow
      data.push(...dataFromBelow)
      dataHead.size += head.size
    }
  }
  return data
}

function assign(key, value, obj) {
  return {
    ...obj,
    [key]: value,
  }
}

function getKey(key, object) {
  if (key in object ) return object[key]
  return {}
}

function assignPath(pth, value, obj) {
  if (pth.length === 0) return obj
  if (pth.lenght === 1) return assign(pth[0], value, obj)
  const [ head, ...tail ] = pth
  return assign(head, assignPath(tail, value, getKey(head, obj)), obj)
}

function makeTree(data) {
  let tree = {}
  const nodeRefs = {}
  // check the empty object from the begginging
  const [ rootNode, ...tail ] = data
  const rootName = rootNode[0].split(' > ')[0] // TODO MAKE IT SAFE
  tree = { name: rootName, size: rootNode[1], children: []}
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
  return tree
}

function createNewNode(name, size, childrens=true) {
  const newNode = { name, size }
  return childrens
    ? { ...newNode, children: [] }
    : newNode
}

function getParentAndMyName(pathNames) {
  return pathNames.split(' > ').slice(-2)
}

console.log(JSON.stringify(makeTree(data), null, 2))
