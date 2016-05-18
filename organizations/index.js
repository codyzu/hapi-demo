import * as config from './config'
import pack from '../package.json'

export function register (server, options, next) {
  server.route({
    method: 'GET',
    path: '/organizations/{name}',
    config: config.getOrg
  })

  server.route({
    method: 'GET',
    path: '/organizations',
    config: config.getAllOrgs
  })

  server.route({
    method: 'POST',
    path: '/organizations',
    config: config.postOrg
  })

  server.route({
    method: 'PATCH',
    path: '/organizations/{name}',
    config: config.patchOrg
  })

  next()
}

register.attributes = {
  name: 'organizations',
  versin: pack.version
}
