import joi from 'joi'
import config from './config'
import glue from 'glue'

const db = {}

glue.compose(config, {relativeTo: __dirname}, (err, server) => {
  if (err) {
    throw err
  }

  server.start((err) => {
    if (err) {
      throw err
    }

    server.route({
      method: 'GET',
      path: '/',
      config: {tags: ['api']},
      handler: (request, reply) => {
        reply('Hello world!')
      }
    })

    server.route({
      method: 'GET',
      path: '/orgs',
      handler: (request, reply) => {
        reply('GET ALL')
      },
      config: {
        tags: ['api']
      }
    })

    server.route({
      method: 'GET',
      path: '/orgs/{name}',
      handler: (request, reply) => {
        console.log(`hello ${request.params.name}!`)
        reply(`hello ${request.params.name}!`)
      },
      config: {
        tags: ['api'],
        validate: {
          params: {
            name: joi.string().max(10)
          }
        }
      }
    })

    server.route({
      method: 'POST',
      path: '/orgs',
      handler: (request, reply) => {
        console.log('POST', request.payload)
        db[request.payload.name] = request.payload
        reply(request.payload).code(201)
      },
      config: {
        tags: ['api'],
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

    console.log(`Server running. Swagger UI at: ${server.info.uri}/documentation`)
  })
})
