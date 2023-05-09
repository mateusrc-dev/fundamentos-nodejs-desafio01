//import assert from 'assert';
import { generate } from 'csv-generate';
import { parse } from 'csv-parse';
import { randomUUID } from 'node:crypto'
import { Database } from '../database.js'
const database = new Database()

export async function handleFileCSV(file) {
  // Initialise the parser by generating random records
  const parser = generate({
  }).pipe(
    parse(file)
  );
  console.log(parser)
  // Intialise count
  //let count = 0;
  // Report start
  process.stdout.write('start\n');
  // Iterate through each records
  for await (const record of parser) {
    // Report current line
    //process.stdout.write(`${count++} ${record.join(',')}\n`);
    // Fake asynchronous operation
    const { title, description } = record
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
  // Report end
  //process.stdout.write('...done\n');
  // Validation
  // assert.strictEqual(count, 100);
};