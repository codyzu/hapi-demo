import joi from 'joi'
import pack from '../package.json'

const db = {}

export function register (server, options, next) {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      const orgs = Object.values(db)
      console.log('GET ALL:', orgs)
      reply(orgs)
    }
  })

  server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, reply) => {
      console.log('GET', request.params.name, db[request.params.name])
      reply(db[request.params.name])
    },
    config: {
      validate: {
        params: {
          name: joi.string().max(10)
        }
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/',
    handler: (request, reply) => {
      console.log('POST', request.payload)
      db[request.payload.name] = request.payload
      reply(request.payload).code(201)
    },
    config: {
      validate: {
        payload: joi.object({
          name: joi.string().max(10).required(),
          email: joi.string().email().required()
        }).unknown(),
        options: {
          stripUnknown: true
        }
      }
    }
  })

  next()
}

register.attributes = {
  name: 'orgs',
  version: pack.version
}
