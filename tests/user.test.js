const app = require("../src/app");
const request = require("supertest");
const User = require("../src/models/user");
const { setupDatabase, userOne, userOneId } = require("./fixtures/db");
describe("User API tests", () => {
  beforeEach(setupDatabase);

  test("Should signup a new user", async () => {
    await request(app)
      .post("/users")
      .send({
        name: "shehoo",
        email: "sheho@gmail.com",
        password: "sheho123",
      })
      .expect(201);
  });

  test("Should login existing user", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);
    const user = await User.findById(userOneId);
    expect(user).not.toBeNull();
    expect(user.tokens[1].token).toBe(response.body.token);
  });

  test("Should not login nonexistent user", async () => {
    await request(app)
      .post("/users/login")
      .send({
        name: userOne.name,
        email: userOne.email + "abs",
        password: userOne.password,
      })
      .expect(400);
  });

  test("Should get profile for authenticated user", async () => {
    await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });

  test("Should not get profile for unauthenticated user", async () => {
    await request(app).get("/users/me").send().expect(401);
  });

  test("Should delete account for user", async () => {
    const response = await request(app)
      .delete("/users/me")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
    //Assert null response to check if the user really deleted.
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
  });

  test("Should not delete account for unauthenticated user", async () => {
    await request(app).delete("/users/me").send().expect(401);
  });

  test("Should upload avatar image", async () => {
    await request(app)
      .post("/users/me/avatar")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .attach("avatar", "tests/fixtures/profile-pic.jpg")
      .expect(200);
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
  });

  test("Should update valid user fields", async () => {
    await request(app)
      .patch("/users/me")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({ name: "Abdelrahman" })
      .expect(200);
    const user = await User.findById(userOneId);
    expect(user.name).toEqual("Abdelrahman");
  });

  test("Should not update invalid user fields", async () => {
    await request(app)
      .patch("/users/me")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({ location: "Cairo" })
      .expect(400);
  });
});
