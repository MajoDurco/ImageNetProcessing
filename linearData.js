const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js')

const parser = new xml2js.Parser();
const content = fs.readFileSync(path.resolve(__dirname, 'structure_released.xml'))
const result = parser.parseString(content, (err, result) => {
  const x = linearNodes(result.ImageNetStructure.synset[0], null)
  console.log(JSON.stringify(x, null, 2))
})

function linearNodes(node, nameFromAbove) {
  let nameFromRoot = [nameFromAbove, node['$'].words].join(PATH_SEPARATOR)
  if(!nameFromAbove) nameFromRoot = node['$'].words // initial call
  let data = [{
    name: nameFromRoot,
    size: 0,
  }]
  let [ dataHead ] = data;
  if ('synset' in node) {
    dataHead.size += node.synset.length
    for (let deeperNode of node.synset) {
      const dataFromBelow = linearNodes(deeperNode, nameFromRoot)
      const [ head ] = dataFromBelow
      data.push(...dataFromBelow)
      dataHead.size += head.size
    }
  }
  return data
}