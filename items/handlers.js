import boom from 'boom'
import _ from 'lodash'

export function fetchItem (request, reply) {
  return request.db.get(`items/${request.params.name}`)

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
  const items = request.pre.items.map((doc) => _.defaultsDeep({url: `${request.server.info.uri}/${doc._id}`}, _.omit(doc, ['_rev', '_id'])))
  request.log('prepare', items)
  reply(items)
}

export function firstItem (request, reply) {
  request.log('route', request.path)
  const item = _.head(request.pre.items)
  request.log('fist', item)
  reply(item)
}

export function replyItems (reqeust, reply) {
  reply(reqeust.pre.items)
}

export function saveRequestedItem (request, reply) {
  let newDoc

  request.db.allDocs({
    startkey: 'items/',
    endkey: 'items/\uffff',
    limit: 0
  })

  .then((result) => {
    request.log('size', result)
    return result.total_rows
  })

  .then((nextOffset) => {
    newDoc = _.defaultsDeep({_id: `items/${request.payload.name}`}, request.payload)
    request.log('new', newDoc)
    return request.db.put(newDoc)
  })

  .then(() => reply([newDoc]))

  .catch((err) => {
    request.log('error', err)
    reply(boom.wrap(err, err.status))
  })
}

export function updateItem (request, reply) {
  if (request.payload.name && request.payload.name !== request.params.name) {
    return reply(boom.notAcceptable(`The 'name' cannot be changed for item '${request.params.name}'`))
  }
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
