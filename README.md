# Task Manager API

<details>
<summary>Table of content</summary>

- [Task Manager API](#task-manager-api)
  - [Description](#description)
  - [Features ✨](#features-)
  - [Authentication and Security](#authentication-and-security)
  - [Project structure](#project-structure)
  - [API Endpoints](#api-endpoints)
      - [for users](#for-users)
      - [for tasks](#for-tasks)
  - [API Documentation](#api-documentation)
    - [User Resource](#user-resource)
      - [Create user](#create-user)
      - [Login user](#login-user)
      - [User logout](#user-logout)
      - [User logout from all sessions](#user-logout-from-all-sessions)
      - [Delete user](#delete-user)
      - [User get profile info](#user-get-profile-info)
      - [User update profile info](#user-update-profile-info)
      - [choose one of these params to update the user](#choose-one-of-these-params-to-update-the-user)
      - [User upload/update a profile picture](#user-uploadupdate-a-profile-picture)
      - [Delete user profile picture](#delete-user-profile-picture)
    - [Task Resource](#task-resource)
      - [User create task](#user-create-task)
      - [User get his tasks](#user-get-his-tasks)
      - [choose any combination of these params to search for tasks](#choose-any-combination-of-these-params-to-search-for-tasks)
    - [Get a single task by id](#get-a-single-task-by-id)
    - [Update a single task by id](#update-a-single-task-by-id)
      - [choose one of these params to update the task](#choose-one-of-these-params-to-update-the-task)
    - [Delete single task by id](#delete-single-task-by-id)
  - [Database Schema](#database-schema)
  - [Installation 📥](#installation-)
  - [How to use](#how-to-use)
    - [Environment Variables](#environment-variables)
  - [Running Tests 🧪](#running-tests-)
    - [Tests Structure](#tests-structure)
  - [Tech/Framework used 🧰](#techframework-used-)
</details>

## Description

Back End Project- Task Manager App that manage user's tasks \
Made using nodejs ,express ,mongodb and mongoose.

## Features ✨

The system serves only one type of users (who made tasks). \
As a user you can do the following :

- Signup with (name ,email and password).
  - After signing up ,the user 'll get a welcome email notification.
- Login with (email and password).
- Logout.
  - Logout from one or all sessions.
- Get all account/profile information.
- Update your account/profile.
- Delete your account/profile.
  - After deleting ,the user 'll get a cancelation email notification.
- Upload/upate a profile picture.
- Delete your profile picture.
- Create tasks.
- Filtering your tasks like this :
  - You can get all of them or just the complete ones or just the incomplete ones.
  - You can get them in a specific(asc/desc) order(by when the task was last created, or last updated)
  - You can paginating tasks(creating pages of tasks that can be requested so you're not fetching everything all at once).
- Get/Update/Delete a specific task by id.

## Authentication and Security

- Hash encryption of passwords and access management with JWT tokens.
- Restricted user access to CRUD operations based on JWT tokens.

## Project structure

<details>
<summary>Click to expand!</summary>

```bash
## Project Structure

📦src
 ┣ 📂db
 ┃ ┗ 📜mongoose.js
 ┣ 📂emails
 ┃ ┗ 📜account.js
 ┣ 📂middleware
 ┃ ┗ 📜auth.js
 ┣ 📂models
 ┃ ┣ 📜task.js
 ┃ ┗ 📜user.js
 ┣ 📂routers
 ┃ ┣ 📜task.js
 ┃ ┗ 📜user.js
 ┗ 📜index.js
```

</details>

</details>

## API Endpoints

#### for users

| Methods  | Endpoints           | Access    | Description                                              |
| :------- | :------------------ | :-------- | :------------------------------------------------------- |
| `POST`   | `/users/login`      | `public`  | `user login`                                             |
| `POST`   | `/users`            | `public`  | `user signUp / create user`                              |
| `POST`   | `/users/logout`     | `private` | `user logout from a session`                             |
| `POST`   | `/users/logoutAll`  | `private` | `user logout from all session`                           |
| `GET`    | `/users/me`         | `private` | `user get his profile`                                   |
| `PATCH`  | `/users/me`         | `private` | `Update user by his id`                                  |
| `DELETE` | `/users/me`         | `private` | `Delete user by his id`                                  |
| `POST`   | `/users/me/avatar`  | `private` | `Creating/updating an avatar(image) to the current user` |
| `DELETE` | `/users/me/avatar`  | `private` | `Deleting an avatar(image) from the current user`        |
| `GET`    | `/users/:id/avatar` | `public`  | `Fetching/Getting an image/avatar by user's id`          |

#### for tasks

| Methods  | Endpoints                      | Access    | Description                                                      |
| :------- | :----------------------------- | :-------- | :--------------------------------------------------------------- |
| `POST`   | `/tasks`                       | `private` | `Create task for user`                                           |
| `GET`    | `/tasks`                       | `private` | `get all tasks(completed/nonCompleted) of user`                  |
| `GET`    | `/tasks?completed=true`        | `private` | `get all completed tasks of user`                                |
| `GET`    | `/tasks?limit=2&skip=3`        | `private` | `get 2 tasks after the 1th three tasks`                          |
| `GET`    | `/tasks?sortBy=createdAt:desc` | `private` | `get tasks ,sorted by the time they're created at in desc order` |
| `GET`    | `/tasks/:id`                   | `private` | `get a task by id`                                               |
| `PATCH`  | `/tasks/:id`                   | `private` | `Update a task by id`                                            |
| `DELETE` | `/tasks/:id`                   | `private` | `Delete a task by id`                                            |

## API Documentation

Server URL

```
https://task-manager-api-jfav.onrender.com/
```

Note: put the server url before each route.
ex:

```http
https://task-manager-api-jfav.onrender.com/users/me
```

### User Resource

#### Create user

```http
  POST /users
```

Note: when you send the body to the server convert it to JSON format.
| Body | Type | Description |
| :--------- | :------- | :--------------------------------- |
| `name` | `string` | **Required**. name of the user |
| `email` | `string` | **Required**. email of the user |
| `password` | `string` | **Required**. password of the user |

| Headers          | Type     | Description          |
| :--------------- | :------- | :------------------- |
| `"Content-Type"` | `string` | `"application/json"` |

<details>
<summary>
Responses
</summary>

1- status code `201` with these data

```json
{
  "user": {
    "name": "Abdelrahman",
    "age": 0,
    "email": "shaheen@gmail.com",
    "_id": "63b8c8239178f65a77902b22",
    "createdAt": "2023-01-07T01:17:23.216Z",
    "updatedAt": "2023-01-07T01:17:23.216Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2I4YzgyMzkxNzhmNjVhNzc5MDJiMjIiLCJpYXQiOjE2NzMwNTQyNDN9.MqmI5pE0kwB6NDmmel7Fyj6TMUBUe8ndb1fe_W_dMGk"
}
```

2- status code `400` when you provide an invalid data inside the body.

</details>

#### Login user

```http
  POST /users/login
```

Note: when you send the body to the server convert it to JSON format.
| Body | Type | Description |
| :--------- | :------- | :--------------------------------- |
| `email` | `string` | **Required**. email of the user |
| `password` | `string` | **Required**. password of the user |

| Headers          | Type     | Description          |
| :--------------- | :------- | :------------------- |
| `"Content-Type"` | `string` | `"application/json"` |

<details>
<summary>
Responses
</summary>

1- status code `200` with these data

```json
{
  "user": {
    "_id": "63b8c8239178f65a77902b22",
    "name": "Abdelrahman",
    "age": 0,
    "email": "shaheen@gmail.com",
    "createdAt": "2023-01-07T01:17:23.216Z",
    "updatedAt": "2023-01-07T01:22:47.239Z",
    "__v": 1
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2I4YzgyMzkxNzhmNjVhNzc5MDJiMjIiLCJpYXQiOjE2NzMwNTQ1Njd9.gPKcrWz3iUkzdkyS6_V5ozVq_TbX_TvKqkZKlBE9KAA"
}
```

2- status code `400` when you provide an invalid data inside the body(like an incorrect user name or password).

</details>

#### User logout

```http
  POST /users/logout
```

| Headers         | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

<details>
<summary>
Responses
</summary>

1- status code of `200 ok`
2- status code of `401` Unauthorized (when you provide an invalid token)
3- status code of `500` Internal Server Error

</details>

#### User logout from all sessions

```http
  POST /users/logoutAll
```

| Headers         | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

<details>
<summary>
Responses
</summary>

1- status code of `200 ok`
2- status code of `401` Unauthorized (when you provide an invalid token)
3- status code of `500` Internal Server Error

</details>

#### Delete user

```http
  DELETE /users/me
```

| Headers         | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

<details>
<summary>
Responses
</summary>

1- status code `200` with these data

```json
{
  "_id": "63b8cd729178f65a77902b38",
  "name": "Abdelrahman",
  "age": 0,
  "email": "shaheen@gmail.com",
  "createdAt": "2023-01-07T01:40:02.474Z",
  "updatedAt": "2023-01-07T02:24:40.306Z",
  "__v": 5
}
```

2- status code of `401` Unauthorized (when you provide an invalid token)
3- status code of `500` Internal Server Error

</details>

#### User get profile info

```http
  GET /users/me
```

| Headers         | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

<details>
<summary>
Responses
</summary>

1- status code `200` with these data

```json
{
  "_id": "63b8d8ca722926efe8081a19",
  "name": "Abdelrahman",
  "age": 0,
  "email": "shaheenabdelrahman28@gmail.com",
  "createdAt": "2023-01-07T02:28:27.120Z",
  "updatedAt": "2023-01-07T02:28:27.120Z",
  "__v": 0
}
```

2- status code of `401` Unauthorized (when you provide an invalid token)

</details>

#### User update profile info

```http
  PATCH /users/me
```

| Headers          | Type     | Description                             |
| :--------------- | :------- | :-------------------------------------- |
| `Authorization`  | `string` | **Required**. Bearer token of the user. |
| `"Content-Type"` | `string` | `"application/json"`                    |

#### choose one of these params to update the user

| Body       | Type     | Description          |
| :--------- | :------- | :------------------- |
| `name`     | `string` | name of user         |
| `age`      | `Number` | age of the user      |
| `email`    | `string` | email of user        |
| `password` | `string` | password of the user |

<details>
<summary>
Responses
</summary>

1- status code `200` with these data

```json
{
  "_id": "63b8d8ca722926efe8081a19",
  "name": "abdo",
  "age": 23,
  "email": "shaheenabdelrahman28@gmail.com",
  "createdAt": "2023-01-07T02:28:27.120Z",
  "updatedAt": "2023-01-07T02:35:03.285Z",
  "__v": 0
}
```

2- status code of `401` Unauthorized (when you provide an invalid token)
3- status code of `400` when you try to update something that does not exist in user schema,it's also send this data

```json
{ "error": "invalid updates!" }
```

4- status code of `400` when you try to do an invalid updates ,ex: update the age to a negative number.

</details>

#### User upload/update a profile picture

```http
  POST /users/me/avatar
```

| Headers         | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

| Body     | Type     | Description             |
| :------- | :------- | :---------------------- |
| `avatar` | `Buffer` | Profile picture of user |

<details>
<summary>
Responses
</summary>

1- status code of `200 ok`
2- status code of `401` Unauthorized (when you provide an invalid token)
3- status code of `400` when you try to upload a large image(more than 1MB) or when the image is not in this type (jpg|jpeg|png).

</details>

#### Delete user profile picture

```http
  DELETE /users/me/avatar
```

| Headers         | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

<details>
<summary>
Responses
</summary>

1- status code of `200 ok`
2- status code of `401` Unauthorized (when you provide an invalid token)

</details>

### Task Resource

#### User create task

```http
  POST /tasks
```

| Headers          | Type     | Description                             |
| :--------------- | :------- | :-------------------------------------- |
| `Authorization`  | `string` | **Required**. Bearer token of the user. |
| `"Content-Type"` | `string` | `"application/json"`                    |

| Body        | Type      | Description                           |
| :---------- | :-------- | :------------------------------------ |
| `desc`      | `string`  | **Required**. Description of the task |
| `completed` | `boolean` | **Optional**. Completed task ?        |

<details>
<summary>
Responses
</summary>

1- status code of `201` with the following data :

```json
{
  "desc": "task5",
  "completed": true,
  "owner": "63b8d8ca722926efe8081a19",
  "_id": "63b9ad67a9d16231fe7f172d",
  "createdAt": "2023-01-07T17:35:35.628Z",
  "updatedAt": "2023-01-07T17:35:35.628Z",
  "__v": 0
}
```

2- status code of `401` Unauthorized (when you provide an invalid token)
3- status code of `400` when you provide an invalid task data

</details>

#### User get his tasks

```http
  GET /tasks
```

| Headers         | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

#### choose any combination of these params to search for tasks

| Parameter   | Type      | Description                                                      |
| :---------- | :-------- | :--------------------------------------------------------------- |
| `completed` | `boolean` | **Optional**. Completed task ?                                   |
| `limit`     | `number`  | **Optional**. Maximum number of tasks to get.                    |
| `skip`      | `number`  | **Optional**. Get tasks after the 1th 'skip number' th of tasks. |
| `sortBy`    | `string`  | **Optional**. Sort tasks in a specific order.                    |

Example URL: Get all completed tasks.

```http
GET /tasks?completed=true
```

<details>

<summary>
Responses
</summary>

1- status code of `200 ok` with these data :

```json
[
  {
    "_id": "63b9ad60a9d16231fe7f1729",
    "desc": "task4",
    "completed": true,
    "owner": "63b8d8ca722926efe8081a19",
    "createdAt": "2023-01-07T17:35:28.938Z",
    "updatedAt": "2023-01-07T17:35:28.938Z",
    "__v": 0
  },
  {
    "_id": "63b9ad67a9d16231fe7f172d",
    "desc": "task5",
    "completed": true,
    "owner": "63b8d8ca722926efe8081a19",
    "createdAt": "2023-01-07T17:35:35.628Z",
    "updatedAt": "2023-01-07T17:35:35.628Z",
    "__v": 0
  }
]
```

2- status code of `401` Unauthorized (when you provide an invalid token)
3- status code of `500` Internal Server Error

</details>

Example URL: Get all uncompleted tasks.

```http
GET /tasks?completed=false
```

<details>

<summary>
Responses
</summary>

1- status code of `200 ok` with these data :

```json
[
  {
    "_id": "63b9ad31a9d16231fe7f171d",
    "desc": "task1",
    "completed": false,
    "owner": "63b8d8ca722926efe8081a19",
    "createdAt": "2023-01-07T17:34:41.112Z",
    "updatedAt": "2023-01-07T17:34:41.112Z",
    "__v": 0
  },
  {
    "_id": "63b9ad35a9d16231fe7f1721",
    "desc": "task2",
    "completed": false,
    "owner": "63b8d8ca722926efe8081a19",
    "createdAt": "2023-01-07T17:34:45.874Z",
    "updatedAt": "2023-01-07T17:34:45.874Z",
    "__v": 0
  },
  {
    "_id": "63b9ad3aa9d16231fe7f1725",
    "desc": "task3",
    "completed": false,
    "owner": "63b8d8ca722926efe8081a19",
    "createdAt": "2023-01-07T17:34:50.717Z",
    "updatedAt": "2023-01-07T17:34:50.717Z",
    "__v": 0
  }
]
```

2- status code of `401` Unauthorized (when you provide an invalid token)
3- status code of `500` Internal Server Error

</details>

Example URL: Get 3 tasks after the 1th two tasks.

```http
GET /tasks?limit=3&skip=2
```

<details>

<summary>
Responses
</summary>

1- status code of `200 ok` with these data :

```json
[
  {
    "_id": "63b9ad3aa9d16231fe7f1725",
    "desc": "task3",
    "completed": false,
    "owner": "63b8d8ca722926efe8081a19",
    "createdAt": "2023-01-07T17:34:50.717Z",
    "updatedAt": "2023-01-07T17:34:50.717Z",
    "__v": 0
  },
  {
    "_id": "63b9ad60a9d16231fe7f1729",
    "desc": "task4",
    "completed": true,
    "owner": "63b8d8ca722926efe8081a19",
    "createdAt": "2023-01-07T17:35:28.938Z",
    "updatedAt": "2023-01-07T17:35:28.938Z",
    "__v": 0
  },
  {
    "_id": "63b9ad67a9d16231fe7f172d",
    "desc": "task5",
    "completed": true,
    "owner": "63b8d8ca722926efe8081a19",
    "createdAt": "2023-01-07T17:35:35.628Z",
    "updatedAt": "2023-01-07T17:35:35.628Z",
    "__v": 0
  }
]
```

2- status code of `401` Unauthorized (when you provide an invalid token)
3- status code of `500` Internal Server Error

</details>

Example URL: Get all tasks in desc order of their creation time.

```http
GET /tasks?sortBy=createdAt:desc
```

<details>

<summary>
Responses
</summary>

1- status code of `200 ok` with these data :

```json
[
  {
    "_id": "63b9ad67a9d16231fe7f172d",
    "desc": "task5",
    "completed": true,
    "owner": "63b8d8ca722926efe8081a19",
    "createdAt": "2023-01-07T17:35:35.628Z",
    "updatedAt": "2023-01-07T17:35:35.628Z",
    "__v": 0
  },
  {
    "_id": "63b9ad60a9d16231fe7f1729",
    "desc": "task4",
    "completed": true,
    "owner": "63b8d8ca722926efe8081a19",
    "createdAt": "2023-01-07T17:35:28.938Z",
    "updatedAt": "2023-01-07T17:35:28.938Z",
    "__v": 0
  },
  {
    "_id": "63b9ad3aa9d16231fe7f1725",
    "desc": "task3",
    "completed": false,
    "owner": "63b8d8ca722926efe8081a19",
    "createdAt": "2023-01-07T17:34:50.717Z",
    "updatedAt": "2023-01-07T17:34:50.717Z",
    "__v": 0
  },
  {
    "_id": "63b9ad35a9d16231fe7f1721",
    "desc": "task2",
    "completed": false,
    "owner": "63b8d8ca722926efe8081a19",
    "createdAt": "2023-01-07T17:34:45.874Z",
    "updatedAt": "2023-01-07T17:34:45.874Z",
    "__v": 0
  },
  {
    "_id": "63b9ad31a9d16231fe7f171d",
    "desc": "task1",
    "completed": false,
    "owner": "63b8d8ca722926efe8081a19",
    "createdAt": "2023-01-07T17:34:41.112Z",
    "updatedAt": "2023-01-07T17:34:41.112Z",
    "__v": 0
  }
]
```

2- status code of `401` Unauthorized (when you provide an invalid token)
3- status code of `500` Internal Server Error

</details>

### Get a single task by id

```http
GET /tasks/:id
```

| Headers         | Type     | Description                                |
| :-------------- | :------- | :----------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the trainee. |

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `string` | **Required**. ID of the task. |

<details>

<summary>
Responses
</summary>

1- status code of `200 ok` with these data :

```json
{
  "_id": "63b9ad3aa9d16231fe7f1725",
  "desc": "task3",
  "completed": false,
  "owner": "63b8d8ca722926efe8081a19",
  "createdAt": "2023-01-07T17:34:50.717Z",
  "updatedAt": "2023-01-07T17:34:50.717Z",
  "__v": 0
}
```

2- status code of `401` Unauthorized (when you provide an invalid token)
3- status code of `500` Internal Server Error
4- status code of `406` when you providing an invalid id for the task
5- status code of `404` when you providing a valid id for the task but task with this id does not exist.

</details>

### Update a single task by id

```http
  PATCH /tasks/:id
```

| Headers          | Type     | Description                             |
| :--------------- | :------- | :-------------------------------------- |
| `Authorization`  | `string` | **Required**. Bearer token of the user. |
| `"Content-Type"` | `string` | `"application/json"`                    |

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `string` | **Required**. ID of the task. |

#### choose one of these params to update the task

| Body        | Type      | Description             |
| :---------- | :-------- | :---------------------- |
| `desc`      | `string`  | Description of the task |
| `completed` | `boolean` | Completed task ?        |

<details>
<summary>
Responses
</summary>

1- status code of `200` with these data :

```json
{
  "_id": "63b9ad3aa9d16231fe7f1725",
  "desc": "task3",
  "completed": true,
  "owner": "63b8d8ca722926efe8081a19",
  "createdAt": "2023-01-07T17:34:50.717Z",
  "updatedAt": "2023-01-07T19:00:34.752Z",
  "__v": 0
}
```

2- status code of `401` Unauthorized (when you provide an invalid token)
3- status code of `400` when you try to update something that does not exist in task schema,it's also send this data

```json
{ "error": "invalid updates!" }
```

4- status code of `400` when you try to do an invalid updates ,ex: update the completed property to string value not to boolean value
5- status code of `404` when you providing a valid id for the task but task with this id does not exist.

</details>

### Delete single task by id

```http
  DELETE /tasks/:id
```

| Headers         | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `string` | **Required**. ID of the task. |

<details>
<summary>
Responses
</summary>

1- status code of `200` with these data :

```json
{
  "_id": "63b9ad3aa9d16231fe7f1725",
  "desc": "task3",
  "completed": true,
  "owner": "63b8d8ca722926efe8081a19",
  "createdAt": "2023-01-07T17:34:50.717Z",
  "updatedAt": "2023-01-07T19:00:34.752Z",
  "__v": 0
}
```

2- status code of `401` Unauthorized (when you provide an invalid token)
3- status code of `500` Internal Server Error
4- status code of `404` when you providing a valid id for the task but task with this id does not exist.

</details>

## Database Schema

<details>
<summary>Diagram</summary>

![Untitled Diagram drawio (3)](https://user-images.githubusercontent.com/77184432/206690286-ef2c2246-0746-4390-8311-b93a2ad345bc.png)

</details>

## Installation 📥

Install my-project with npm

```bash
> git clone https://github.com/AbdelrahmanShaheen/task-manager-api
> cd task-manager-api/
> npm install
```

## How to use

use the scripts in package.json

```bash
> npm run start
or
> npm run dev
```

or

```bash
> node src/index.js
or
> env-cmd -f ./config/dev.env nodemon src/index.js
```

the backend server will be running on the specified port on your env files.

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file \
\
`MONGODB_URL`

`JWT_SECRET`

`EMAIL_PASSWORD`

`EMAIL_USER`

## Running Tests 🧪

The testing is done using `jest`. To run the tests, run the following command

```bash
> npm run test
```

![ss1](https://user-images.githubusercontent.com/77184432/213866623-9fa50c5b-641b-4485-af36-df8400ddd533.png)

### Tests Structure

<details>
<summary> Click Me! </summary>

```bash

📦tests
 ┣ 📂fixtures
 ┃ ┣ 📜db.js
 ┃ ┗ 📜profile-pic.jpg
 ┣ 📂__mocks__
 ┃ ┗ 📜nodemailer.js
 ┣ 📜task.test.js
 ┗ 📜user.test.js

```

</details>

## Tech/Framework used 🧰

- [Redux](https://redux.js.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Jest](https://jestjs.io/)
- [supertest](https://www.npmjs.com/package/supertest)
- [Swagger](https://swagger.io/)
- [Git](https://git-scm.com/)
- [NodeMailer](https://nodemailer.com/about/)
- [Handlebars](https://handlebarsjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Postman](https://www.postman.com/)
- [VSCode](https://code.visualstudio.com/)
