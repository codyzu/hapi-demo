import pack from '../package.json'
import * as config from './config'

export function register (server, options, next) {
  server.route({
    method: 'GET',
    path: '/',
    config: config.getAll
  })

  server.route({
    method: 'GET',
    path: '/{name}',
    config: config.getByName
  })

  server.route({
    method: 'POST',
    path: '/',
    config: config.postNew
  })

  next()
}

register.attributes = {
  name: 'orgs',
  version: pack.version
}
