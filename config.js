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
    {plugin: 'blipp'},
    {plugin: './orgs'}
  ]
}
