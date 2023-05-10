import { parse } from 'csv-parse';
import { Database } from '../database.js'
const database = new Database()
import { randomUUID } from 'node:crypto'
import fs from "node:fs" // for read files

const csvPath = new URL('./tasks.csv', import.meta.url)

const stream = fs.createReadStream(csvPath)

const csvParse = parse({
  delimiter: ',',
  skip_empty_lines: true,
  fromLine: 2,
})

export async function run() {
  const linesParse = stream.pipe(csvParse)

  for await (const line of linesParse) {
    const [ title, description ] = line
    const task = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    }
    database.insert('tasks', task)
  }

  //await wait(1000)
};

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}