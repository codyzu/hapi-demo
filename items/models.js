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
  }

  getOrganizationByName (orgName) {
    return this.db.get(`organizations/${orgName}`)
  }

  createOrganization (doc) {
    const newOrganization = _.defaultsDeep(
      {_id: `organizations/${doc.name}`},
      doc
    )

    console.log('creating', newOrganization)

    return this.db.put(newOrganization)

    .catch((e) => {
      console.log('create error:', e)
      throw e
    })

    .then((x) => {
      console.log('created', x)
    })

    .then(() => newOrganization)
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
