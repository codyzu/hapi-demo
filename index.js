import config from './config'
import glue from 'glue'

glue.compose(config, {relativeTo: __dirname}, (err, server) => {
  if (err) {
    throw err
  }

  server.start((err) => {
    if (err) {
      throw err
    }

    server.route({
      method: 'GET',
      path: '/',
      config: {tags: ['api']},
      handler: (request, reply) => {
        reply('Hello world!')
      }
    })

    console.log(`Server running. Swagger UI at: ${server.info.uri}/documentation`)
  })
})
