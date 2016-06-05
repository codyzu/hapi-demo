import pack from './package.json'

export default {
  // hapi server options
  server: {},

  // hapi connections
  connections: [ {
    port: 3000
  } ],

  // hapi plugin registrations
  registrations: [
    {
      plugin: {
        register: 'good',
        options: {
          ops: {interval: 60000},
          reporters: {
            console: [{module: 'good-console'}, 'stdout']
          }
        }
      }
    },
    {plugin: 'inert'},
    {plugin: 'vision'},
    {
      plugin: {
        register: 'hapi-swagger',
        options: {
          info: {
            title: 'Dojo organizations API',
            description: 'Exposes API to CRUDL organizations.',
            version: pack.version
          }
        }
      }
    },
    {plugin: 'blipp'},
    {plugin: './models'},
    {plugin: './orgs'}
  ]
}
