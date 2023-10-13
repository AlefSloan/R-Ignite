import fastify from 'fastify'

import { knex } from './database'

const app = fastify()

app.get('/test', async () => {
  return await knex('sqlite_schema').select('*')
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running')
  })
