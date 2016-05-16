// import hapi from 'hapi'
import PouchDB from 'pouchdb'
// import jsome from 'jsome'
import glue from 'glue'
import chalk from 'chalk'
import pack from './package.json'

const manifest = {
  // hapi server options
  server: {
    // debug: {
    //   log: ['error', 'uncaught'],
    //   request: ['error', 'uncaught']
    // }
  },

  // hapi connections
  connections: [ {
    port: 3030
  } ],

  // hapi plugin registrations
  registrations: [
    {
      plugin: {
        register: 'good',
        options: {
          ops: {interval: 1000},
          reporters: {
            console: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*', error: '*', request: '*' }]
              },
              {module: 'good-console'},
              'stdout'
            ]
          }
        }
      }
    },
    {plugin: 'blipp'},
    {plugin: 'inert'},
    {plugin: 'vision'},
    {
      plugin: {
        register: 'hapi-swagger',
        options: {
          info: {
            title: 'Amazing API',
            description: 'Exposes API to that is truly amazing.',
            version: pack.version
          }
        }
      }
    },
    {plugin: './items'}
  ]
}

export default new Promise((resolve, reject) => {
  glue.compose(manifest, {relativeTo: __dirname}, (err, server) => {
    if (err) {
      reject(err)
    }

    server.decorate('request', 'db', new PouchDB('./db'))

    server.start(() => {
      console.log('SERVER RUNNING AT:', chalk.green(`${server.info.uri}/documentation`))
      resolve(server)
    })
  })
})

// // const pouch = new PouchDB('./db')
// const pouch = new PouchDB('http://localhost:5984/testdb')
//
// // pouch.put({
// //   _id: 'cody1',
// //   description: 'this is codys first document',
// //   count: 1
// // })
// //
// // .then(() => pouch.allDocs({include_docs: true}))
//
// // pouch.allDocs({include_docs: true})
//
// pouch.get('cody1')
//
// .then((results) => {
//   console.log('get 1:')
//   jsome(results)
//   return results
// })
//
// // .then(() => pouch.get('cody1'))
//
// .then((doc) => {
//   doc.count = doc.count + 1
//   return pouch.put(doc)
// })
//
// .then(() => pouch.get('cody1'))
//
// .then((doc) => {
//   console.log('get 2:')
//   jsome(doc)
// })
//
// .catch((err) => {
//   console.error(err)
// })
