import * as validations from './validations'
import joi from 'joi'

const db = {}

export const getAll = {
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

export const getByName = {
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

export const postNew = {
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
