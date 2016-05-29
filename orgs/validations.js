import joi from 'joi'

export const org = joi.object({
  name: joi.string().max(10).required().example('axway'),
  email: joi.string().email().required().example('cody@email.com')
}).unknown()

export const orgList = joi.array().items(org).example([{name: 'dfdf', email: 'sdfds@dfd.com'}])
