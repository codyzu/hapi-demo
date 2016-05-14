import joi from 'joi'

export const name = joi.string().max(30).example('name_of_item').required()

export const newItem = joi.object().keys({
  name: joi.string().max(20).required().example('joe'),
  description: joi.string().max(100).example('works at axway')
}).unknown().label('validation object')

export const changeItem = joi.object()
