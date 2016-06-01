import * as validations from './validations'
import * as handlers from './handlers'

export const getAll = {
  tags: ['api'],
  response: {
    schema: validations.orgList
  },
  pre: [
    {method: handlers.fetchAllOrgs, assign: 'orgs'}
  ],
  handler: handlers.prepareOrgs
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
    {method: handlers.fetchOrg, assign: 'orgs'},
    {method: handlers.prepareOrgs, assign: 'orgs'}
  ],
  handler: handlers.firstOrg
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
  pre: [
    {method: handlers.createOrg, assign: 'orgs'},
    {method: handlers.prepareOrgs, assign: 'orgs'}
  ],
  handler: handlers.firstOrg
}
