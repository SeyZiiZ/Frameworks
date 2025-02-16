# Task Manager

The **Task Manager** is a modern and intuitive web application designed to simplify daily task management. This solution is built with a full-stack architecture using modern and efficient technologies.

<img src="./ExternalImages/Home_page_task_manager.png" alt="Alternative text" width="1000" />

## Project Structure
- **frontend/** : Contains the React frontend code.
- **frontend/public/** : Static files for the frontend.
- **frontend/src/** : Source files for the frontend.
- **backend/** : Contains the Node.js backend code.

## Built With
- [Vite](https://vitejs.dev/) - Development server.
- [React](https://react.dev/) - Frontend framework.
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
- [Node.js](https://nodejs.org/) - Backend runtime.
- [MongoDB](https://www.mongodb.com/) - NoSQL database.
- [Express](https://expressjs.com/) - Web framework for Node.js.
- [JSON-RPC](https://www.jsonrpc.org/) - RPC protocol.
- [Axios](https://axios-http.com/fr/docs/intro) - HTTP / Fetch calls.

## Features:

### Frontend (React)
- Simple user interface to interact with the backend.
- CRUD operations via the REST API.
- Function calls based on RPC for real-time operations.

### Backend (Node.js)
- REST API for task management.
- RPC mechanism using JSON-RPC for real-time actions.

#### REST API Features (Task Management)
- **POST /tasks** : Create a task.
- **GET /tasks** : Retrieve all tasks.
- **GET /tasks/:id** : Retrieve a single task.
- **PUT /tasks/:id** : Update a task.
- **DELETE /tasks/:id** : Delete a task.

**Task Object Example:**
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, bread, and eggs",
  "completed": false
}
```

### Prerequisites:
- Node.js
- npm or yarn

### Frontend / Backend Installation:

- Frontend in dev mode (you need to build it for production):
```bash
cd frontend
npm install
npm run dev 
```

- Backend in dev mode (you need to build it for production) :
- Before, update the backend .env to include you'r mongo cluster at MONGO_URI 
```bash
cd backend
sudo vim .env
PORT="8080"
MONGO_URI="You'r own mongo cluster"
```
- And then
```bash
npm install 
ts-node src/server.ts
```
## Licence 
- This project is licensed under the MIT License - see the [LICENCE](https://fr.wikipedia.org/wiki/Licence_MIT) file for more details.
