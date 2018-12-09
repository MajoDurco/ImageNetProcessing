import url from 'url'

const PATH_SEPARATOR = ' > '

export const getSearchUrl = (query) => url.format({
  pathname: 'search/',
  query,
})

export function splitNamePath(namePath) {
  return namePath.split(PATH_SEPARATOR)
}

export function getNodeName(pathNames) {
  return splitNamePath(pathNames).slice(-1)
}