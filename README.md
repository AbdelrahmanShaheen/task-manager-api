# Task Manager API

### Description

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

### Authentication and Security

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

The API documentation is done using swagger. To access the documentation, go to the following URL

```
http://localhost:PORT/api-docs
```

### User Resource

#### Create user

```http
  POST /users
```

| Body       | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `name`     | `string` | **Required**. name of the user     |
| `email`    | `string` | **Required**. email of the user    |
| `password` | `string` | **Required**. password of the user |

<details>
<summary>
Response
</summary>

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

</details>

#### Login user

```http
  POST /users/login
```

| Body       | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `email`    | `string` | **Required**. email of the user    |
| `password` | `string` | **Required**. password of the user |

<details>
<summary>
Response
</summary>

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

</details>

#### User logout

```http
  POST /users/logout
```

| Headers         | Type     | Description                              |
| :-------------- | :------- | :--------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the Admin. |

<details>
<summary>
Response
</summary>
there is no response ,just a status code of \
```json
200 ok
```
</details>

#### User logout from all sessions

```http
  POST /users/logoutAll
```

| Headers         | Type     | Description                              |
| :-------------- | :------- | :--------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the Admin. |

<details>
<summary>
Response
</summary>
there is no response ,`just` a status code of`200 OK`
</details>

## Database Schema

<details>
<summary>Diagram</summary>

![Untitled Diagram drawio (3)](https://user-images.githubusercontent.com/77184432/206690286-ef2c2246-0746-4390-8311-b93a2ad345bc.png)

</details>

## Installation

1. Download the repo or do this: `git clone https://github.com/AbdelrahmanShaheen/Weather-app`
2. Go to Weather-app folder
3. Install all the dependencies using the following command: `npm install`
4. Run the application using the following command : `npm run start`

## To do

- [x] Provide Sorting, Pagination, and Filtering on the data.
- [x] Set up email notifications using a nodemailer service.
- [x] Allow users to upload a profile picture.
- [ ] Do automation testing using Jest framework
