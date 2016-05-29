import joi from 'joi'
import pack from '../package.json'
import * as validations from './validations'

const db = {}

export function register (server, options, next) {
  server.route({
    method: 'GET',
    path: '/',
    config: {
      tags: ['api'],
      response: {
        schema: validations.orgList
      },
      handler: (request, reply) => {
        const orgs = Object.values(db)
        console.log('GET ALL:', orgs)
        reply(orgs)
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/{name}',
    config: {
      tags: ['api'],
      validate: {
        params: {
          name: joi.string().max(10)
        }
      },
      response: {schema: validations.org},
      handler: (request, reply) => {
        console.log('GET', request.params.name, db[request.params.name])
        reply(db[request.params.name])
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/',
    config: {
      tags: ['api'],
      validate: {
        payload: validations.org,
        options: {
          stripUnknown: true
        }
      },
      response: {schema: validations.org},
      handler: (request, reply) => {
        console.log('POST', request.payload)
        db[request.payload.name] = request.payload
        reply(request.payload).code(201)
      }
    }
  })

  next()
}

register.attributes = {
  name: 'orgs',
  version: pack.version
}
