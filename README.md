# Task Manager API

### Description

Back End Project- Task Manager App that manage user's tasks \
Made using nodejs ,express ,mongodb and mongoose.

### Project structure

<details>
<summary>Click to expand!</summary>

```bash
## Project Structure

    .
    ¦   package.json
    +---src
        +-- index.js
        ¦
        +---db
        ¦   +-- mongoose.js
        ¦
        +---middleware
        ¦   +-- uauth.js
        ¦
        +---models
        ¦   +-- task.js
        ¦   +-- user.js
        ¦
        +---routers
            +--  task.js
            +--  user.js
```

</details>

</details>

### API Endpoints

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

### Authentication and Security

- Hash encryption of passwords and access management with JWT tokens.
- Restricted user access to CRUD operations based on JWT tokens.

### Database Schema

<details>
<summary>Diagram</summary>

![Untitled Diagram drawio (3)](https://user-images.githubusercontent.com/77184432/206690286-ef2c2246-0746-4390-8311-b93a2ad345bc.png)

</details>

### Installation

1. Download the repo or do this: `git clone https://github.com/AbdelrahmanShaheen/Weather-app`
2. Go to Weather-app folder
3. Install all the dependencies using the following command: `npm install`
4. Run the application using the following command : `npm run start`

### To do

- [x] Provide Sorting, Pagination, and Filtering on the data.
- [x] Set up email notifications using a nodemailer service.
- [x] Allow users to upload a profile picture.
- [ ] Do automation testing using Jest framework
