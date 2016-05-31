export function getAll (request, reply) {
  request.models.orgs.listOrgs()
  .then((orgs) => {
    console.log('GET ALL:', orgs)
    reply(orgs)
  })
}

export function getByName (request, reply) {
  const orgName = request.params.name
  request.models.orgs.getOrg(orgName)
  .then((org) => {
    console.log('GET:', org)
    reply(org)
  })
}

export function postNew (request, reply) {
  request.models.orgs.createOrg(request.payload)
  .then((org) => {
    console.log('CREATED:', org)
    reply(org).code(201)
  })
}
