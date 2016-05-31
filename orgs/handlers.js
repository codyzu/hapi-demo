import boom from 'boom'
import {defaultsDeep, omit} from 'lodash'

export function getAllOrgs (request, reply) {
  request.models.orgs.listOrgs()
  .then((orgs) => {
    console.log('GET ALL:', orgs)
    reply(orgs)
  })
  .catch((err) => reply(boom.wrap(err, err.status)))
}

export function getOrgByName (request, reply) {
  const orgName = request.params.name
  request.models.orgs.getOrg(orgName)
  .then((doc) => {
    const org = defaultsDeep({url: `${request.server.info.uri}/${doc._id}`}, omit(doc, ['_id', '_rev']))
    console.log('GET:', org)
    reply(org)
  })
  .catch((err) => reply(boom.wrap(err, err.status)))
}

export function postOrg (request, reply) {
  request.models.orgs.createOrg(request.payload)
  .then((org) => {
    console.log('CREATED:', org)
    reply(org).code(201)
  })
  .catch((err) => reply(boom.wrap(err, err.status)))
}
