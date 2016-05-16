import {test} from 'tap'
import server from '../'

// const options = {
//
// }

test('Server', (fixture) => {
  server.then((s) => {
    fixture.tearDown(() => {
      s.stop()
    })
    fixture.test('POST /items', (t) => {
      t.plan(1)
      s.inject({
        method: 'GET',
        url: '/items'
      }, (response) => {
        t.equal(response.result.length, 0, 'empty list')
      })
    })

    fixture.end()
  })
})
