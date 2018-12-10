import url from 'url'
import config from './config'

const PATH_SEPARATOR = ' > '

export const getSearchUrl = (query) => url.format({
  pathname: 'search/',
  query,
})

export const getBackendSearchUrl = (query) => url.format({
  protocol: config.server.protocol,
  hostname: config.server.host,
  pathname: 'search/',
  port: config.server.port,
  query,
})

export function splitNamePath(namePath) {
  return namePath.split(PATH_SEPARATOR)
}

export function getNodeName(pathNames) {
  return splitNamePath(pathNames).slice(-1)
}