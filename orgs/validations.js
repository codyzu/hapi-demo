import joi from 'joi'

export const name = joi.string().max(10).required().example('Axway').default('Axway')

export const org = joi.object({
  name,
  email: joi.string().email().required().example('cody@email.com')
}).unknown()

export const orgList = joi.array().items(org).example([{name: 'Axway', email: 'cody@email.com'}])
