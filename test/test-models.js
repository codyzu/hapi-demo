import models from '../models'
import PouchDB from 'pouchdb'
import {test} from 'tap'

test('models', (fixture) => {
  // TODO move to memory
  const testModels = models(new PouchDB('./db'))

  fixture.test('creates organizations', (t) => {

  })

  fixture.end()
})
