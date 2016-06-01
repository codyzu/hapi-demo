import boom from 'boom'
import {defaultsDeep, omit} from 'lodash'

export function fetchOrg (request, reply) {
  const orgName = request.params.name
  console.log('FETCH:', orgName)
  request.models.orgs.getOrg(orgName)
  .then((org) => {
    reply([org])
  })
  .catch((err) => reply(boom.wrap(err, err.status)))
}

export function fetchAllOrgs (request, reply) {
  console.log('FETCH ALL')
  request.models.orgs.listOrgs()
  .then((orgs) => {
    reply(orgs)
  })
  .catch((err) => reply(boom.wrap(err, err.status)))
}

export function createOrg (request, reply) {
  console.log('CREATING')
  request.models.orgs.createOrg(request.payload)
  .then((org) => {
    reply([org]).code(201)
  })
  .catch((err) => reply(boom.wrap(err, err.status)))
}

export function prepareOrgs (request, reply) {
  console.log('PREPARING')
  reply(request.pre.orgs.map((org) => defaultsDeep({url: `${request.server.info.uri}/${org._id}`}, omit(org, ['_id', '_rev']))))
}

export function firstOrg (request, reply) {
  console.log('FIRST ORG')
  reply(request.pre.orgs[0])
}
