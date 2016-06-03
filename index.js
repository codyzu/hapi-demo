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
        validate: {
          params: {
            name: joi.string().max(10)
          }
        }
      }
    })

    console.log(`Server running. Swagger UI at: ${server.info.uri}/documentation`)
  })
})
