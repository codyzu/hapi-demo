import joi from 'joi'
import pack from '../package.json'

const db = {}

export function register (server, options, next) {
  server.route({
    method: 'GET',
    path: '/orgs',
    config: {
      tags: ['api'],
      response: {
        schema: joi.array().items(
          joi.object({
            name: joi.string().max(10).required(),
            email: joi.string().email().required()
          }).unknown())
        .example([{name: 'Axway', email: 'cody@email.com'}])
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
    path: '/orgs/{name}',
    config: {
      tags: ['api'],
      validate: {
        params: {
          name: joi.string().max(10).default('Axway')
        }
      },
      response: {
        schema: joi.object({
          name: joi.string().max(10).required().example('Axway'),
          email: joi.string().email().required().example('cody@email.com')
        }).unknown()
      },
      handler: (request, reply) => {
        const org = db[request.params.name]
        console.log('GET', request.params.name, org)
        reply(org)
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/orgs',
    config: {
      tags: ['api'],
      validate: {
        payload: joi.object({
          name: joi.string().max(10).required().example('Axway'),
          email: joi.string().email().required().example('cody@email.com')
        }).unknown(),
        options: {
          stripUnknown: true
        }
      },
      response: {
        schema: joi.object({
          name: joi.string().max(10).required().example('Axway'),
          email: joi.string().email().required().example('cody@email.com')
        }).unknown()
      },
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
