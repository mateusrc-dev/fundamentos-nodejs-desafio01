import http from 'node:http'
import { json } from '../middlewares/json.js'

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/tasks') {
    return res
    .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/tasks') {
    const { title, description } = req.body
    users.push({
      id: 1,
      title,
      description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    })
    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)