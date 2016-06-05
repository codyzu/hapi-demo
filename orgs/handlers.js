const db = {}

export function getAllOrgs (request, reply) {
  request.models.orgs.listOrgs()
  .then((orgs) => {
    console.log('GET ALL:', orgs)
    reply(orgs)
  })
}

export function getOrgByName (request, reply) {
  const org = db[request.params.name]
  console.log('GET', request.params.name, org)
  reply(org)
}

export function postOrg (request, reply) {
  console.log('POST', request.payload)
  db[request.payload.name] = request.payload
  reply(request.payload).code(201)
}
