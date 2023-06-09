import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8').then(data => {
      this.#database = JSON.parse(data)
    }).catch(() => {this.#persist()})
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data
  }

  selectById(table, id) {
    let data = this.#database[table] ?? []

    if (data) {
      data = data.filter(row => row.id === id)
    }

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { 
        id, 
        ...data,
        completed_at: this.#database[table][rowIndex].completed_at, 
        created_at: this.#database[table][rowIndex].created_at, 
        updated_at: new Date(), 
      }
      this.#persist()
    }
  }

  updateComplete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    console.log(rowIndex)

    if (rowIndex > -1) {
      this.#database[table][rowIndex].completed_at = true
      this.#persist()
    }
  }

  delete(table, id) {
    const newTasks = this.#database[table].filter(row => row.id !== id)

    if (newTasks) {
      this.#database[table] = newTasks
      this.#persist()
    }
  }
}