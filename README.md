## A Todo Application

### Tech stack used:
- Node
- Typescript
- TypeORM
- Express
- React
- Postgres

### Endpoints:
The available endpoints are:

List the todos: GET `localhost:3001/todos`

Create a todo: POST `localhost:3001/todos`

Update a todo: PATCH `localhost:3001/todos/:todoID`

Create a subtask: POST `localhost:3001/todos/:todoID/subtasks`

Update a subtask: PATCH `localhost:3001/todos/:todoID/subtasks/subtaskID`

How to setup:
- Create a .env file in the `server` directory and fill it using .env.example as a sample.
- create a database and use the credentials in the .env file
- cd into the `server` folder and run `yarn run dev`
- then cd ito the `client` folder and run `yarn start`
- now the client app should be accessible on htttp://localhost:3000
- now the server app should be accessible on htttp://localhost:5000

Seeeding Data:
- to seed some sample data on a fresh database:
- cd into the `server` folder
- run `yarn seed-sampleData`
- now the dtabase will have some prefilled data


Skipped Implemetation:

Completing a todo leads to completion of all subtasks:
This can be achieved when a todo status is completed. We get all the related subtask for that todo and we can bulk-update their status in one operation to set them to true similar to the code snippet below:
```
 return getConnection()
      .createQueryBuilder()
      .update(Todo)
      .set({ status: 'completed'})
      .where({ id: In(ids) })
      .execute();
```
where `ids` are the ids of the subtasks.


Docker:

Docker can also be used to run the appllication by creating docker files for each of the client and server.
Then a dockder-compose.yml can be created in the root directory to start the services.
