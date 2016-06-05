import joi from 'joi'
import * as handlers from './handlers'

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
  handler: handlers.getAllOrgs
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
  handler: handlers.getOrgByName
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
  handler: handlers.postOrg
}
