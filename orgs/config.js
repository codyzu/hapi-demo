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
  response: {schema: validations.org},
  pre: [
    {method: handlers.getOrgByName, assign: 'org'}
  ],
  handler: handlers.prepareOrgs
}

export const post = {
  tags: ['api'],
  validate: {
    payload: validations.newOrg,
    options: {
      stripUnknown: true
    }
  },
  response: {
    schema: validations.org
  },
  handler: handlers.postOrg
}
