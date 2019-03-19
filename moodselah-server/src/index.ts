import dotenv from "dotenv";
dotenv.config();

import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
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

const registerSignalEvent = (httpServer, dbConnection) => {
  if (!httpServer) {
    return;
  }
  process.on("SIGINT", () => {
    console.info("SIGINT signal received.");
    httpServer.close(err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      if (dbConnection) {
        dbConnection
          .close()
          .then(() => {
            console.log("typeorm connection disconnected");
            process.exit(0);
          })
          .catch(e => {
            console.error(e);
            process.exit(1);
          });
      } else {
        process.exit(0);
      }
    });
  });
};

const handleAppStart = () => console.log(`Listening on port ${PORT}`);
const appStart = async () => {
  try {
    const dbConnection = await createConnection(connectionOptions);
    const httpServer = await app.start(appOptions, handleAppStart);
    registerSignalEvent(httpServer, dbConnection);
    process.send && process.send("ready");
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

appStart();
