import hapi from 'hapi'
import joi from 'joi'

const server = new hapi.Server()
server.connection({port: 3000})

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply('Hello world!')
  }
})

server.route({
  method: 'GET',
  path: '/{name}',
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

server.route({
  method: 'POST',
  path: '/',
  handler: (request, reply) => {
    console.log(`posting ${request.payload}`)
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

server.start((err) => {
  if (err) {
    throw err
  }

  console.log(`Server running at: ${server.info.uri}`)
})
