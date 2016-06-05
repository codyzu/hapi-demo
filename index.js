import config from './config'
import glue from 'glue'

import Orgs from './models/orgs'

const orgs = new Orgs()
orgs.createOrg({name: 'Axway', desc: 'software', email: 'cody@zusch.com'})
.then((doc) => console.log('NEW ORG:', doc))
.then(() => orgs.getOrg('Axway'))
.then((doc) => console.log('GET ORG:', doc))
.then(() => orgs.listOrgs())
.then((docs) => console.log('ALL ORGS:', docs))
.catch((err) => console.log('ERR:', err))

glue.compose(config, {relativeTo: __dirname}, (err, server) => {
  if (err) {
    throw err
  }

  server.start((err) => {
    if (err) {
      throw err
    }

    console.log(`Server running. Swagger UI at: ${server.info.uri}/documentation`)
  })
})
