import * as handlers from './handlers'
import * as validations from './validations'

export const getAll = {
  tags: ['api'],
  response: {
    schema: validations.orgList
  },
  handler: handlers.getAllOrgs
}

export const getByName = {
  tags: ['api'],
  validate: {
    params: {
      name: validations.name
    }
  },
  response: {
    schema: validations.org
  },
  handler: handlers.getOrgByName
}

export const post = {
  tags: ['api'],
  validate: {
    payload: validations.org,
    options: {
      stripUnknown: true
    }
  },
  response: {
    schema: validations.org
  },
  handler: handlers.postOrg
}
