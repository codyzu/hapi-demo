export default {
  // hapi server options
  server: {},

  // hapi connections
  connections: [ {
    port: 3000
  } ],

  // hapi plugin registrations
  registrations: [
    {plugin: './orgs'}
  ]
}
