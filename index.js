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

    console.log(`Server running. Swagger UI at: ${server.info.uri}/documentation`)
  })
})
