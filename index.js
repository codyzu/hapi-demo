import joi from 'joi'
import config from './config'
import glue from 'glue'

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
        console.log(`posting ${request.payload}`)
        reply(request.payload).code(201)
      },
      config: {
        tags: ['api']
      }
    })

    console.log(`Server running. Swagger UI at: ${server.info.uri}/documentation`)
  })
})
