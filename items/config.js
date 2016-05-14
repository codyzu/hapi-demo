import * as handlers from './handlers'
import * as validations from './validations'

export const getItem = {
  description: 'gets items by name',
  pre: [
    {method: handlers.fetchItem, assign: 'items'},
    {method: handlers.prepareItems, assign: 'items'},
    {method: handlers.firstItem, assign: 'items'}
  ],
  handler: handlers.replyItems,
  tags: ['api'],
  validate: {
    params: {
      name: validations.name
    }
  }
}

export const getAllItems = {
  description: 'gets all items',
  pre: [
    {method: handlers.getAllItems, assign: 'items'},
    {method: handlers.prepareItems, assign: 'items'}
  ],
  handler: handlers.replyItems,
  tags: ['api']
}

export const postItem = {
  description: 'creates a new item',
  pre: [
    {method: handlers.saveRequestedItem, assign: 'items'},
    {method: handlers.prepareItems, assign: 'items'},
    {method: handlers.firstItem, assign: 'items'}
  ],
  handler: handlers.replyItems,
  tags: ['api'],
  validate: {
    payload: validations.newItem
  }
}

export const patchItem = {
  description: 'modifies an existing item',
  pre: [
    {method: handlers.fetchItem, assign: 'items'},
    {method: handlers.firstItem, assign: 'items'},
    {method: handlers.updateItem, assign: 'items'},
    {method: handlers.prepareItems, assign: 'items'},
    {method: handlers.firstItem, assign: 'items'}
  ],
  handler: handlers.replyItems,
  tags: ['api'],
  validate: {
    params: {
      name: validations.name
    },
    payload: validations.changeItem
  }
}
