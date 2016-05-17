import models from '../items/models'
import PouchDB from 'pouchdb'
import memdown from 'memdown'
import {test} from 'tap'

test('models', {autoend: true}, (fixture) => {
  // let db = new PouchDB('./db3')
  // let orgModel = models(db).organizations
  let db, orgModel

  fixture.beforeEach((done) => {
    console.log('creating db')
    db = new PouchDB('testdb', {db: memdown})
    orgModel = models(db).organizations
    done()
  })

  fixture.afterEach(() => {
    console.log('destroying db')
    return db.destroy()
    .then(() => {
      console.log('db destroyed')
    })
  })

  // fixture.plan(2)

  return fixture.test('creates organizations', (t) => {
    return orgModel.createOrganization({
      name: 'axway',
      description: 'this is a description'
    })

    .then((newOrg) => {
      return orgModel.getAllOrganizations()
    })

    .then((allOrgs) => {
      t.done()
    })
  })

  .then(() => fixture.test('lists all organizations', (t) => {
    t.plan(1)
    console.log('starting')
    const expectedOrgs = [
      {name: 'axway', description: 'software supplier'},
      {name: 'sopra', description: 'services supplier'}
    ]

    // const promises = expectedOrgs.map((org) => orgModel.createOrganization(org))
    // console.log('promises', promises)
    //
    // return Promise.all(promises)

    return orgModel.createOrganization(expectedOrgs[0])

    // .then(() => orgModel.createOrganization(expectedOrgs[1]))

    .catch((err) => {
      console.log('error', err)
    })

    .then((orgs) => {
      console.log('created')
      console.log('ORGS:', orgs)
      return orgModel.getAllOrganizations()
    })

    .then((allOrgs) => {
      console.log('ORGS:', allOrgs)
      t.ok(1, 'its ok')
      console.log('done')
      t.done()
    })

    .catch(t.threw)
  }))

  console.log('DONE')
  // fixture.end()
})
