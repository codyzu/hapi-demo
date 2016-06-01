import * as handlers from './handlers'
import * as validations from './validations'

export const getAll = {
  tags: ['api'],
  response: {
    schema: validations.orgList
  },
  pre: [
    {method: handlers.fetchAllOrgs, assign: 'orgs'},
    {method: handlers.prepareOrgs, assign: 'orgs'}
  ],
  handler: handlers.replyOk
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
    {method: handlers.prepareOrgs, assign: 'orgs'},
    {method: handlers.firstOrg, assign: 'orgs'}
  ],
  handler: handlers.replyOk
}

export const post = {
  tags: ['api'],
  validate: {
    payload: validations.newOrg,
    options: {
      stripUnknown: true
    }
  },
  response: {schema: validations.org},
  pre: [
    {method: handlers.createOrg, assign: 'orgs'},
    {method: handlers.prepareOrgs, assign: 'orgs'},
    {method: handlers.firstOrg, assign: 'orgs'}
  ],
  handler: handlers.replyCreated
}
