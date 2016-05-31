import * as validations from './validations'
import * as handlers from './handlers'

export const getAll = {
  tags: ['api'],
  response: {
    schema: validations.orgList
  },
  handler: handlers.getAll
}

export const getByName = {
  tags: ['api'],
  validate: {
    params: {
      name: validations.name
    }
  },
  response: {schema: validations.org},
  pre: [
    {method: handlers.getByName, assign: 'org'}
  ],
  handler: handlers.prepareOrg
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
  handler: handlers.postNew
}
