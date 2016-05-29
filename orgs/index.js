import joi from 'joi'
import pack from '../package.json'
import * as validations from './validations'

const db = {}

export function register (server, options, next) {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      const orgs = Object.values(db)
      console.log('GET ALL:', orgs)
      reply(orgs)
    },
    config: {
      tags: ['api'],
      response: {
        schema: validations.orgList
      }
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
      tags: ['api'],
      validate: {
        params: {
          name: joi.string().max(10)
        }
      },
      response: {schema: validations.org}
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
      tags: ['api'],
      validate: {
        payload: validations.org,
        options: {
          stripUnknown: true
        }
      },
      response: {schema: validations.org}
    }
  })

  next()
}

register.attributes = {
  name: 'orgs',
  version: pack.version
}
