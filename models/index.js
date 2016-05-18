import _ from 'lodash'

class Organizations {
  constructor (db) {
    this.db = db
  }

  getAllOrganizations () {
    return this.db.allDocs({
      startkey: 'organizations/',
      endkey: 'organizations/\uffff',
      include_docs: true
    })

    .then((results) => results.rows.map((r) => r.doc))
  }

  getOrganizationByName (orgName) {
    return this.db.get(`organizations/${orgName}`)
  }

  createOrganization (doc) {
    const newOrganization = _.defaultsDeep(
      {_id: `organizations/${doc.name}`},
      doc
    )

    return this.db.put(newOrganization)

    .then(() => newOrganization)
  }

  updateOrganization (name, changes) {
    if (changes.name && changes.name !== name) {
      throw new Error(`Cannot rename orgainzation ${name}`)
    }

    let updatedOrganization

    return this.getOrganizationByName(name)

    .then((org) => {
      updatedOrganization = _.merge(org, changes)
      this.db.put(updatedOrganization)
    })

    .then(() => updatedOrganization)
  }
}

class Contacts {
  constructor (db) {
    this.db = db
  }

  getOrganizationContacts (orgName) {
    return this.db.allDocs({
      startkey: `contacts/${orgName}/`,
      endkey: `contacts/${orgName}/\uffff`,
      include_docs: true
    })
  }

  getContactByOrganizationAndName (orgName, personName) {
    this.db.get(`contacts/${orgName}/${personName}`)
  }

  createContactProfile (doc, organization) {
    const newContactProfile = _.defaultsDeep(
      {_id: `contacts/${organization.name}/${doc.name}`},
      doc
    )

    return this.db.put(newContactProfile)

    .then(() => newContactProfile)
  }
}

export default function models (db) {
  return {
    organizations: new Organizations(db),
    contacts: new Contacts(db)
  }
}
