import * as handlers from './handlers'
import * as validations from './validations'

export const getOrg = {
  description: 'gets an organization by name',
  pre: [
    {method: handlers.fetchOrg, assign: 'orgs'},
    {method: handlers.prepareOrgs, assign: 'orgs'},
    {method: handlers.firstOrg, assign: 'orgs'}
  ],
  handler: handlers.replyOrgs,
  tags: ['api'],
  validate: {
    params: {
      name: validations.name
    }
  }
}

export const getAllOrgs = {
  description: 'gets all organizations',
  pre: [
    {method: handlers.getAllOrgs, assign: 'orgs'},
    {method: handlers.prepareOrgs, assign: 'orgs'}
  ],
  handler: handlers.replyOrgs,
  tags: ['api']
}

export const postOrg = {
  description: 'creates an organization',
  pre: [
    {method: handlers.saveOrg, assign: 'orgs'},
    {method: handlers.prepareOrgs, assign: 'orgs'},
    {method: handlers.firstOrg, assign: 'orgs'}
  ],
  handler: handlers.replyOrgs,
  tags: ['api'],
  validate: {
    payload: validations.newOrg
  }
}

export const patchOrg = {
  description: 'modifies an existing organization',
  pre: [
    {method: handlers.updateOrg, assign: 'orgs'},
    {method: handlers.prepareOrgs, assign: 'orgs'},
    {method: handlers.firstOrg, assign: 'orgs'}
  ],
  handler: handlers.replyOrgs,
  tags: ['api'],
  validate: {
    params: {
      name: validations.name
    },
    payload: validations.changeItem
  }
}
