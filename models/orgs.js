import PouchDb from 'pouchdb'
import memdown from 'memdown'
import {defaultsDeep} from 'lodash'

export default class Orgs {
  constructor () {
    this.db = new PouchDb({name: 'orgs', db: memdown})
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
