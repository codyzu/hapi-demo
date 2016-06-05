import Orgs from './orgs'
import PouchDb from 'pouchdb'
import memdown from 'memdown'
import pack from '../package.json'

export function register (server, options, next) {
  const pouchOptions = options.connection || {name: 'orgs', db: memdown}
  const pouch = new PouchDb(pouchOptions)
  const models = {
    orgs: new Orgs(pouch)
  }

  server.decorate('request', 'models', models)

  next()
}

register.attributes = {
  name: 'models',
  version: pack.version
}
