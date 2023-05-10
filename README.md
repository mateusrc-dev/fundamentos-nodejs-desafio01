NodeJS Fundamentals - Ignite's NodeJs Trail Challenge - Rocketseat

In this project we apply the basic concepts of NodeJs such as HTTP methods (get, put, patch, post), HTTP Status Code (to give feedback to the user of his request (if it was a success, if an error occurred, etc.)), Streams (readable and writeable)

In this project we create routes for the user to be able to:

- create your tasks
- list the created tasks
- update task information
- delete a task
- update if task completed
- create new tasks automatically - in this route a csv file is read and tasks are created automatically
- list a task by id

To run the project just use the command: npm run dev
You can use insomnia to make the requests. Create files in insomnia with the following HTTP and Path methods (where 'id' is to put the task id in place):

POST - localhost:3333/tasks
GET - localhost:3333/tasks - this route can use query params
PUT - localhost:3333/tasks
DELETE - localhost:3333/tasks/id
PATCH - localhost:3333/tasks/id/complete
POST - localhost:3333/tasks/newTasks
GET - localhost:3333/tasks/id
