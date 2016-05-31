import test from 'blue-tape'
import hapi from 'hapi'
import request from 'request-promise'
import PouchDb from 'pouchdb'
import memdown from 'memdown'

test('test tape', (t) => {
  t.equal(true, true, 'assertions')

  return Promise.resolve().then(() => {
    t.equal(true, true, 'assertions in promises')
  })
})

test('hapi server', (t) => {
  let server
  return createServer()

  .then((srv) => {
    server = srv
    t.comment(`Server running at: ${srv.info.uri}`)
    t.ok(srv.info.started, 'server is started')
    t.ok(srv.info.port, 'server has a valid port')
    return srv.info.uri
  })

  .then((uri) => request({uri}))

  .then((response) => {
    t.equal(response, 'Hello world!', 'GET returns "Hello World!"')
  })

  .then(
    () => server.stop(),
    (err) => {
      if (server) {
        return server.stop()

        .then(
          () => {
            throw err
          },
          (stopError) => {
            // log the error, but throw the original
            t.comment(`Error stopping server ${stopError}`)
            throw err
          }
        )
      }
    }
  )
})

testPouch({name: './testdb'}, 'PouchDb sqlite')
testPouch({name: 'testdb', db: memdown}, 'PouchDb memdown')

function testPouch (pouchOptions, name) {
  test(name, (t) => {
    let pouch
    const desc = 'this is a test'

    return new PouchDb(pouchOptions)

    .then((db) => {
      pouch = db
    })

    .then(() => pouch.post({desc}))

    .then((result) => {
      t.ok(result.ok, 'post was success')
      return result.id
    })

    .then((id) => pouch.get(id))

    .then((doc) => {
      t.equal(doc.desc, desc, 'doc has description')
    })
  })
}

function createServer () {
  const server = new hapi.Server()
  server.connection()

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply('Hello world!')
    }
  })

  return server.start()
  .then(() => server)
}
