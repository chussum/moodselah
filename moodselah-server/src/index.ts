import dotenv from "dotenv";
dotenv.config();

import { Options } from "graphql-yoga";
import { createConnection, getConnection } from "typeorm";
import app from "./app";
import connectionOptions from "./ormConfig";
import decodeJWT from "./helpers/decodeJWT";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTION_ENDPOINT: string = "/subscription";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,
    onConnect: async connectionParams => {
      const token = connectionParams.Authorization;
      if (token) {
        const user = await decodeJWT(token);
        if (user) {
          return {
            currentUser: user
          };
        }
      }
      throw new Error("No JWT. Can't subscribe");
    }
  }
};

const handleAppStart = () => console.log(`Listening on port ${PORT}`);

let httpServer;

createConnection(connectionOptions)
  .then(() => {
    app.start(appOptions, handleAppStart).then(res => {
      httpServer = res;
    });
  })
  .catch(error => console.log(error));

process.on('SIGINT', () => {
  console.info('SIGINT signal received.');

  if (httpServer) {
    // Stops the server from accepting new connections and finishes existing connections.
    httpServer.close(async (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      // close your database connection and exit with success (0 code)
      const connection = getConnection();
      await connection.close();
      console.log('typeorm connection disconnected');

      process.exit(0);
    });
  }
});
