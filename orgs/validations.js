import joi from 'joi'

export const name = joi.string().max(10).required().example('Axway')

export const org = joi.object({
  name,
  email: joi.string().email().required().example('dojo@axway.com')
}).unknown()

export const orgList = joi.array().items(org).example([{name: 'Axway', email: 'dojo@axway.com'}])
