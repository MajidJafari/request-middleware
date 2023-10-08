import { Server } from "http";
import { bootstrap } from "../../app";

let server: Server;
beforeAll(async () => {
  server = await bootstrap(7001, "test");
});

afterAll(() => {
  if (server.closeAllConnections) {
    server.closeAllConnections();
  }
  server && server.close() && server.unref();
});

export const getServer = async (): Promise<Server> => {
  if (!server) {
    server = await bootstrap(7001, "test");
  }
  return server;
};
