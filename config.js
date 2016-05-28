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
    {plugin: './orgs'}
  ]
}
