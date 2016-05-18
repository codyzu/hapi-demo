import PouchDB from 'pouchdb'
import glue from 'glue'
import chalk from 'chalk'
import pack from './package.json'
import models from './models'

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
    // {plugin: './items'},
    {plugin: './organizations'}
  ]
}

export default new Promise((resolve, reject) => {
  glue.compose(manifest, {relativeTo: __dirname}, (err, server) => {
    if (err) {
      console.error('Error configuring server:', err)
      reject(err)
    }

    const db = new PouchDB('mydb')
    // server.decorate('request', 'db', db)
    server.decorate('request', 'models', models(db))

    server.start(() => {
      server.log('info', 'SERVER RUNNING AT: ' + chalk.green(`${server.info.uri}/documentation`))
      resolve(server)
    })
  })
})
