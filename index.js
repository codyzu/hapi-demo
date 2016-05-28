import hapi from 'hapi'
import orgs from './orgs'

const server = new hapi.Server()
server.connection({port: 3000})

server.register(orgs, (err) => {
  if (err) {
    throw err
  }

  server.start((err) => {
    if (err) {
      throw err
    }

    console.log(`Server running at: ${server.info.uri}`)
  })
})
