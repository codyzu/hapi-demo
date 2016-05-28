import hapi from 'hapi'
import joi from 'joi'

const server = new hapi.Server()
server.connection({port: 3000})

const db = {}

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
    console.log('GET', request.params.name, db[request.params.db])
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

server.start((err) => {
  if (err) {
    throw err
  }

  console.log(`Server running at: ${server.info.uri}`)
})
