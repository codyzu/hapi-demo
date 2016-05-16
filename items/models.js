import _ from 'lodash'

class Organizations {
  constructor (db) {
    this.db = db
  }

  getAllOrganizations () {
    this.db.allDocs({
      startkey: `organizations/`,
      endkey: `organizations/\uffff`,
      include_docs: true
    })
  }

  getOrganizationByName (orgName) {
    return this.db.get(`organizations/${orgName}`)
  }

  createOrganization (doc) {
    const newOrganization = _.defaultsDeep(
      {id: `organizations/${doc.name}`},
      doc
    )

    return this.db.put(newOrganization)

    .then(() => newOrganization)
  }
}

class Contacts {
  constructor (db) {
    this.db = db
  }

  getOrganizationContacts (orgName) {
    this.db.allDocs({
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
      {id: `contacts/${organization.name}/${doc.name}`},
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
