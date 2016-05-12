import joi from 'joi'
import * as handlers from './handlers'

export const getItem = {
  description: 'gets items by name',
  pre: [
    {method: handlers.fetchItem, assign: 'fetchedItem'}
  ],
  handler: handlers.prepareItem,
  tags: ['api'],
  validate: {
    params: {
      name: joi.string().max(20).default('joe').required()
    }
  }
}

export const getAllItems = {
  description: 'gets all items',
  handler: handlers.getAllItems,
  tags: ['api']
}

export const postItem = {
  description: 'creates a new item',
  handler: handlers.postItem,
  tags: ['api'],
  validate: {
    payload: joi.object().keys({
      name: joi.string().max(20).required().example('joe'),
      description: joi.string().max(100).example('works at axway')
    }).unknown().label('validation object')
  }
}

export const patchItem = {
  description: 'modifies an existing item',
  pre: [
    {method: handlers.fetchItem, assign: 'fetchedItem'},
    {method: handlers.updateItem, assign: 'updateResult'},
    {method: handlers.fetchItem, assign: 'fetchedItem'}
  ],
  handler: handlers.prepareItem,
  tags: ['api'],
  validate: {
    params: {
      name: joi.string().max(20).default('joe').required()
    },
    payload: joi.object().keys({
      name: joi.string().max(20).example('joe'),
      description: joi.string().max(100).example('works at axway')
    }).unknown().label('validation object')
  }
}
