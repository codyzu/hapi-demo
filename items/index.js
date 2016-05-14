import * as itemsConfig from './config'

export function register (server, options, next) {
  server.route({
    method: 'GET',
    path: '/items/{name}',
    config: itemsConfig.getItem
  })

  server.route({
    method: 'GET',
    path: '/items',
    config: itemsConfig.getAllItems
  })

  server.route({
    method: 'POST',
    path: '/items',
    config: itemsConfig.postItem
  })

  server.route({
    method: 'PATCH',
    path: '/items/{name}',
    config: itemsConfig.patchItem
  })

  next()
}

register.attributes = {
  name: 'plugin1',
  versin: 'myversion'
}
