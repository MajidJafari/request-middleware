import "jest-extended";
import request from "supertest";
import { getServer } from "./init/setup";
import { Server } from "http";

describe("Auth", () => {
  let server: Server;

  beforeEach(async () => {
    server = await getServer();
  });

  describe("login", () => {
    it("should not validate without username", async () => {
      await request(server)
        .post("/auth/login")
        .send({ password: "test" })
        .expect(422);
    });
    it("should not validate without password", async () => {
      await request(server)
        .post("/auth/login")
        .send({ username: "test" })
        .expect(422);
    });
    it("should not login with wrong Username", async () => {
      await request(server)
        .post("/auth/login")
        .send({ username: "wrong", password: "test" })
        .expect(401);
    });
    it("should not login with wrong password", async () => {
      await request(server)
        .post("/auth/login")
        .send({ username: "test", password: "wrong" })
        .expect(401);
    });
    it("should login ", async () => {
      const {
        body: {
          data: { access_token: accessToken },
        },
      } = await request(server)
        .post("/auth/login")
        .send({ username: "test", password: "testPassword" })
        .expect(200);
    });
  });
});