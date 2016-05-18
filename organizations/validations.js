import joi from 'joi'

export const name = joi.string().max(30).example('Axway').required()

export const newOrg = joi.object().keys({
  name: joi.string().max(20).required().example('Axway'),
  description: joi.string().max(100).example('Software vendor')
}).unknown().label('validation object')

export const changeItem = joi.object()
