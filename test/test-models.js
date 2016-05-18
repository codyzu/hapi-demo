import models from '../items/models'
import PouchDB from 'pouchdb'
import memdown from 'memdown'
import {test} from 'tap'

test('models', {autoend: true}, (fixture) => {
  let db = new PouchDB('testdb', {db: memdown})
  let orgModel = models(db).organizations

  const expectedOrg = {
    name: 'axway',
    description: 'this is a description'
  }

  fixture.test('starts empty', (t) => {
    t.plan(1)

    return orgModel.getAllOrganizations()

    .then((orgs) => {
      t.equal(0, orgs.length, 'starts empty')
    })

    .catch(t.threw)
  })

  fixture.test('creating organization returns created org', (t) => {
    t.plan(2)

    return orgModel.createOrganization(expectedOrg)

    .then((actualOrg) => {
      t.equal(actualOrg.name, expectedOrg.name, 'correct name')
      t.equal(actualOrg.description, expectedOrg.description, 'correct description')
    })

    .catch(t.threw)
  })

  fixture.test('lists all organizations', (t) => {
    t.plan(3)

    return orgModel.getAllOrganizations()

    .then((allOrgs) => {
      t.equal(allOrgs.length, 1, 'legnth of 1')
      const actualOrg = allOrgs[0]
      t.equal(actualOrg.name, expectedOrg.name, 'correct name')
      t.equal(actualOrg.description, expectedOrg.description, 'correct description')
    })

    .catch(t.threw)
  })

  fixture.test('get organization by name', (t) => {
    t.plan(2)

    return orgModel.getOrganizationByName(expectedOrg.name)

    .then((actualOrg) => {
      t.equal(actualOrg.name, expectedOrg.name, 'correct name')
      t.equal(actualOrg.description, expectedOrg.description, 'correct description')
    })

    .catch(t.threw)
  })

  fixture.test('update organization', (t) => {
    t.plan(2)

    const modifications = {description: 'a new description'}

    return orgModel.updateOrganization(expectedOrg.name, modifications)

    .then((actualOrg) => {
      t.equal(actualOrg.name, expectedOrg.name, 'correct name')
      t.equal(actualOrg.description, modifications.description, 'correct description')
    })

    .catch(t.threw)
  })
})
