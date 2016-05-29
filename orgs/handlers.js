const db = {}

export function getAll (request, reply) {
  const orgs = Object.values(db)
  console.log('GET ALL:', orgs)
  reply(orgs)
}

export function getByName (request, reply) {
  console.log('GET', request.params.name, db[request.params.name])
  reply(db[request.params.name])
}

export function postNew (request, reply) {
  console.log('POST', request.payload)
  db[request.payload.name] = request.payload
  reply(request.payload).code(201)
}
