import {defaultsDeep} from 'lodash'

export default class Orgs {
  constructor (db) {
    this.db = db
  }

  createOrg (org) {
    const orgDoc = defaultsDeep({_id: `orgs/${org.name}`}, org)

    return this.db.put(orgDoc)

    .then(() => orgDoc)
  }

  getOrg (name) {
    return this.db.get(`orgs/${name}`)
  }

  listOrgs () {
    return this.db.allDocs({
      startkey: 'orgs/',
      endkey: 'orgs/\uffff',
      include_docs: true
    })

    .then((results) => results.rows.map((r) => r.doc))
  }
}
