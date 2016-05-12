import boom from 'boom'
import _ from 'lodash'

export function fetchItem (request, reply) {
  return request.db.get(request.params.name)

  .then((doc) => {
    request.log('fetch', doc)
    return [doc]
  })

  .then(reply)

  .catch((err) => {
    request.log('error', err)
    reply(boom.wrap(err, err.status))
  })
}

export function prepareItems (request, reply) {
  const items = request.pre.items.map((doc) => _.omit(doc, ['_rev', '_id']))
  request.log('prepare', items)
  reply(items)
}

export function firstItem (request, reply) {
  const item = _.head(request.pre.items)
  request.log('fist', item)
  reply(item)
}

export function replyItems (reqeust, reply) {
  reply(reqeust.pre.items)
}

export function postItem (request, reply) {
  return request.db.put(_.defaultsDeep({_id: request.payload.name}, request.payload))

  .then(() => request.db.get(request.payload.name))

  .then((doc) => {
    reply(_.omit(doc, ['_rev', '_id']))
  })

  .catch((err) => {
    request.log('error', err)
    reply(boom.wrap(err, err.status))
  })
}

export function updateItem (request, reply) {
  const item = _.merge(request.pre.items, request.payload)
  return request.db.put(item)

  .then(() => {
    request.log('update', item)
    reply([item])
  })

  .catch((err) => {
    request.log('error', err)
    reply(boom.wrap(err, err.status))
  })
}

export function getAllItems (request, reply) {
  return request.db.allDocs({include_docs: true})

  .then((response) => response.rows.map((row) => row.doc))

  .then((docs) => {
    request.log('fetchAll', docs)
    reply(docs)
  })

  .catch((err) => {
    request.log('error', err)
    reply(boom.wrap(err, err.status))
  })
}
