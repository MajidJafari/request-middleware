import "jest-extended";
import request from "supertest";
import { getServer } from "./init/setup";
import { Server } from "http";
import { Roles } from "../types/models";

describe("User", () => {
  let server: Server;

  beforeEach(async () => {
    server = await getServer();
  });

  describe("list", () => {
    it("should not allow unauthenticated user to get the list", async () => {
      await request(server).get("/users").expect(401);
    });
    it("should get the list of users", async () => {
      const {
        body: {
          data: { access_token: accessToken },
        },
      } = await request(server)
        .post("/auth/login")
        .send({ username: "test", password: "testPassword" })
        .expect(200);

      const {
        body: { data: users },
      } = await request(await getServer())
        .get("/users")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200);

      expect(users).toBeArray();
      expect(users.length).toBe(1);
      expect(`${users[0].firstName} ${users[0].lastName}`).toEqual("Ali Alaki");
    });
  });
  describe("create", () => {
    it("should not allow unauthenticated user to create a user", async () => {
      await request(server).post("/users").expect(401);
    });
    it("should be validated create a user with wrong parameters", async () => {
      const {
        body: {
          data: { access_token: accessToken },
        },
      } = await request(server)
        .post("/auth/login")
        .send({ username: "test", password: "testPassword" })
        .expect(200);

      await request(server)
        .post("/users")
        .send({ username: "test" })
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(422);
    });
    it("should create a user", async () => {
      const {
        body: {
          data: { access_token: accessToken },
        },
      } = await request(server)
        .post("/auth/login")
        .send({ username: "test", password: "testPassword" })
        .expect(200);

      const {
        body: { data: user },
      } = await request(await getServer())
        .post("/users")
        .send({
          username: "string",
          firstName: "string1",
          lastName: "string2",
          password: "string",
        })
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(201);

      expect(user).toBeObject();
      expect(user).toHaveProperty("firstName", "string1");
      expect(user).toHaveProperty("lastName", "string2");
    });
    it("should sanitize the created user", async () => {
      const {
        body: {
          data: { access_token: accessToken },
        },
      } = await request(server)
        .post("/auth/login")
        .send({ username: "test", password: "testPassword" })
        .expect(200);

      const {
        body: { data: user },
      } = await request(await getServer())
        .post("/users")
        .send({
          username: "string ",
          firstName: " string1 ",
          lastName: "string2  ",
          password: "string",
        })
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(201);

      expect(user).toBeObject();
      expect(user).toHaveProperty("firstName", "string1");
      expect(user).toHaveProperty("lastName", "string2");
    });
  });
});
