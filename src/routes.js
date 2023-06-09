import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search,
      } : null)
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const id = req.params.id

      const task = database.selectById('tasks', id)
      return res.end(JSON.stringify(task))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body
      if (!title) {
        return res.writeHead(400).end(
            JSON.stringify({message: 'title is required'})
          )
      }
      if (!description) {
        return res.writeHead(400).end(
            JSON.stringify({message: 'description is required'})
          )
      }
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }
      database.insert('tasks', task)
      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const id = req.params.id
      const { title, description } = req.body
      const task = database.selectById('tasks', id)

      if (task.length === 0) {
        return res.writeHead(400).end(
            JSON.stringify({message: 'task not found'})
          )
      }
      if (!description) {
        return res.writeHead(400).end(
            JSON.stringify({message: 'description is required'})
          )
      }
      database.update('tasks', id, {
        title,
        description,
      })

      return res.writeHead(204).end()
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const id = req.params.id
      const task = database.selectById('tasks', id)

      if (task.length === 0) {
        return res.writeHead(400).end(
            JSON.stringify({message: 'task not found'})
          )
      }

      database.updateComplete('tasks', id)
      
      return res.writeHead(204).end()
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const id = req.params.id
      database.delete('tasks', id)
      return res.writeHead(204).end()
    },
  },
]