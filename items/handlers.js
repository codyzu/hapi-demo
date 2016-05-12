import boom from 'boom'
import _ from 'lodash'

export function fetchItem (request, reply) {
  return request.db.get(request.params.name)

  .then((doc) => {
    request.log('fetch', doc)
    return doc
  })

  .then(reply)

  .catch((err) => {
    request.log('error', err)
    reply(boom.wrap(err, err.status))
  })
}

export function prepareItem (request, reply) {
  const item = _.omit(request.pre.fetchedItem, ['_rev', '_id'])
  request.log('prepare', item)
  reply(item)
}

// export function getItem (request, reply) {
//   return request.db.get(request.params.name)
//
//   .then((doc) => {
//     reply(_.omit(doc, ['_rev', '_id']))
//   })
//
//   .catch((err) => {
//     request.log('error', err)
//     reply(boom.wrap(err, err.status))
//   })
// }

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
  return request.db.put(_.merge(request.pre.fetchedItem, request.payload))

  .then((result) => {
    request.log('update', result)
    reply(result)
  })

  .catch((err) => {
    request.log('error', err)
    reply(boom.wrap(err, err.status))
  })
}

// export function patchItem (request, reply) {
//   return request.db.put(_.merge(request.pre.fetchedItem, request.payload))
//
//   .then((result) => {
//     reply(result)
//   })
//
//   .catch((err) => {
//     request.log('error', err)
//     reply(boom.wrap(err, err.status))
//   })
// }

export function getAllItems (request, reply) {
  return request.db.allDocs({include_docs: true})

  .then((docs) => {
    reply(docs)
  })

  .catch((err) => {
    request.log('error', err)
    reply(boom.wrap(err, err.status))
  })
}
