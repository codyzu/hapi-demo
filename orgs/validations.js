import joi from 'joi'

export const org = joi.object({
  name: joi.string().max(10).required(),
  email: joi.string().email().required()
}).unknown()

export const orgList = joi.array().items(org)
