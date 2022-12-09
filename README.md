# Task Manager API
### Description
Back End Project- Task Manager App that manage user's tasks \
Made using nodejs ,express ,mongodb and mongoose.

### Project structure
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

### API Endpoints 
#### for users
| Methods   | Endpoints       | Access                            |Description|
| :-------- | :-------------- | :-------------------------------- | :---------|
| `POST`      | `/users/login`|`public`       | `user login`
| `POST`      | `/users`|`public`       | `user signUp / create user`
| `POST`      | `/users/logout`|`private`       | `user logout from a session`
| `POST`      | `/users/logoutAll`|`private`       | `user logout from all session`
| `GET`      | `/users/me`|`private`       | `user get his profile`
| `PATCH`      | `/users/me`|`private`       | `Update user by his id`
| `DELETE`      | `/users/me`|`private`       | `Delete user by his id`

#### for tasks
| Methods   | Endpoints       | Access                            |Description|
| :-------- | :-------------- | :-------------------------------- | :---------|
| `POST`      | `/tasks`|`private`       | `Create task for user`
| `GET`       |`/tasks`       |`private` | `Read all tasks of user`
| `GET`       |`/tasks/:id`|`private`    | `Read a task by id`
| `PATCH`     |`/tasks/:id`|`private`       | `Update a task by id`
| `DELETE`    | `/tasks/:id`   |`private`       | `Delete a task by id`

### Authentication and Security
- Hash encryption of passwords and access management with JWT tokens.
- Restricted user access to CRUD operations based on JWT tokens.

### Database Schema
![Untitled Diagram drawio (3)](https://user-images.githubusercontent.com/77184432/206690286-ef2c2246-0746-4390-8311-b93a2ad345bc.png)


### Installation

1. Download the repo or do this: ```git clone https://github.com/AbdelrahmanShaheen/Weather-app```
2. Install all the dependencies using the following command: ```npm install```
3. Run the application using the following command : ```npm run start```

### To do 
- [ ] Provide Sorting, Pagination, and Filtering on the data.
- [ ] Set up email notifications using a send grid service.
- [ ] Allow users to upload a profile picture.
- [ ]  Do automation testing using Jest framework
