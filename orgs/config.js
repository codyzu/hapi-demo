import joi from 'joi'

const db = {}

export const getAll = {
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

export const getByName = {
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

export const post = {
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
