import _ from 'lodash'

export function fetchOrg (request, reply) {
  return request.models.organizations.getOrganizationByName(request.params.name)

  .then((org) => reply([org]))

  .then(reply)

  .catch(reply)
}

export function prepareOrgs (request, reply) {
  const orgs = request.pre.orgs.map((org) => _.defaultsDeep({url: `${request.server.info.uri}/${org._id}`}, _.omit(org, ['_rev', '_id'])))
  reply(orgs)
}

export function firstOrg (request, reply) {
  reply(_.head(request.pre.orgs))
}

export function replyOrgs (reqeust, reply) {
  reply(reqeust.pre.orgs)
}

export function saveOrg (request, reply) {
  return request.models.org.createOrganization(request.payload)

  .then((org) => reply([org]))

  .catch(reply)
}

export function updateOrg (request, reply) {
  return request.models.organizations.updateOrganization(request.params.name, request.payload)

  .then((org) => reply([org]))

  .catch(reply)
}

export function getAllOrgs (request, reply) {
  return request.models.organizations.getAllOrganizations()

  .then(reply)

  .catch(reply)
}
