# Task Management System

## Overview
This developer challenge came with the following brief:

### Objective
To assess your ability to build a simple API and frontend using best coding practices.

### Scenario
HMCTS requires a new system to be developed so caseworkers can keep track of their tasks. Your technical test is to develop that new system so caseworkers can efficiently manage their tasks.

### Backend API
The backend should be able to:
- Create a task with the following properties:
    - Title
    - Description (optional field)
    - Status
    - Due date/time
- Retrieve a task by ID
- Retrieve all tasks
- Update the status of a task
- Delete a task

### Frontend Application
The frontend should be able to:
- Create, view, update, and delete tasks
- Display tasks in a user-friendly interface

## Features

### Backend API
The backend provides the following functionality:
- **Create a Task**: Add a new task with the following properties:
  - Title 
  - Description (optional)
  - Completed
  - Due date/time
- **Retrieve a Task**: Fetch a task by its unique ID.
- **Retrieve All Tasks**: List all tasks in the system.
- **Update Task Status**: Modify the status of a task.
- **Delete a Task**: Remove a task from the system.

### Frontend Application
The frontend allows users to:
- Create, view, update, and delete tasks.
- Display tasks in a user-friendly interface with features such as:
  - Due date shown in red when overdue.
  - Completed tasks sorted to the bottom of the list.
  - Due date auto-populated to the current date/time when creating a new task.

## Tech Stack
- **Frontend**: Next.js, React, TypeScript
- **Backend**: Node.js, TypeScript
- **Database**: SQLite
- **Testing**: Jest
- **Package Manager**: npm
- **Validation**: Zod for backend validation and type safety

## Design decisions
- **Frontend**: Next.js was chosen for its flexibility of rendering options including good server-side rendering capabilities, and ease of use with React. TypeScript was used for type safety and better developer experience.
- **Backend**: Node.js was to simplify development and use the same language on the front and back end. TypeScript was used for type safety.
- **Database**: SQLite was chosen for its simplicity and ease of setup, making it ideal for a small-scale application like this.
- **Testing**: Jest was used for its simplicity and ease of integration with both frontend and backend.
- **Validation**: Zod was used for providing pre-build validation options and type safety, allowing for better error handling and validation of incoming data.

## Extendability
With more time I would add the following features:
- **Filtering options**: Allow user to filter completed tasks, task by due date etc
- **More status options**: As well as completed / incomplete a in-progress status could be added allowing future features such as Kanban boards
- **Due today page**: a separate page for tasks due today
- **Soft delete**: Soft delete tasks and add them to a deleted page where they could be hard deleted. This would prevent accidental deletion
- **Dark mode**: Add a dark mode toggle to the UI - some CSS classes already exist for this functionality
- **Authentication**: Add authentication and user management
- **Optimistic update**: Checkbox updates are slow because they wait for a HTTP request to the server. Optimistically updating the UI then checking against the server response would be better
- **Front-end testing**: Jest tests should be extended to the front-end
- **Hosting**: I would like to host this on a platform like Vercel which integrates well with Next.js and GitHub CI/DC pipelines.
- **Task management**: Allow users to add tags to tasks or to separate them into directories for better control over complex tasks.
- **Mobile**: The software is not optimised for mobile and adding CSS media queries would allow for a better experience on mobile.

## Installation

### Prerequisites
- Node.js (v23 or higher)
- npm (v10 or higher)

### Setup for development server
1. Navigate to the project directory:
   ```bash
   cd dts-developer-challenge
   ```
2. Install dependencies:
   ```bash
    npm install
    ```
3. Start the server:
4. ```bash
   npm run dev
   ```
   
   
### API Documentation
The backend API exposes the following endpoints:

- `POST /tasks`: Create a new task
- `GET /tasks/:id`: Retrieve a task by ID
- `GET /tasks`: Retrieve all tasks
- `PUT /tasks/:id`: Update a task by ID
- `DELETE /tasks/:id`: Delete a task by ID

### Testing
- To run tests run:
  ```bash
  npm test
  ```

