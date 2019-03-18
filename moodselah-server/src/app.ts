import cors from "cors";
import express, { NextFunction, Response } from "express";
import { GraphQLServer, PubSub } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import path from "path";
import decodeJWT from "./helpers/decodeJWT";
import errorMiddleware from "./middlewares/error.middleware";
import schema from "./schema";

const { UPLOAD_FILE_PATH } = process.env;

class App {
  public app: GraphQLServer;
  public pubSub: any;

  constructor() {
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(99);
    this.app = new GraphQLServer({
      schema,
      context: req => {
        const { connection: { context = null } = {} } = req;
        return {
          req: req.request,
          pubSub: this.pubSub,
          context
        };
      }
    });
    this.registerMiddlewares();
    this.registerStaticPath();
    this.registerCustomRoutes();
    this.registerErrorHandles();
  }

  private registerMiddlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  private registerStaticPath = (): void => {
    this.app.express.use(
      "/images",
      express.static(path.resolve(__dirname, UPLOAD_FILE_PATH as string))
    );
    this.app.express.use(
      express.static(
        path.resolve(__dirname, "../../moodselah-client", "build-current")
      )
    );
  };

  private registerCustomRoutes = (): void => {
    this.app.express.get("*", (req, res) =>
      res.sendFile(
        path.resolve(
          __dirname,
          "../../moodselah-client",
          "build-current",
          "index.html"
        )
      )
    );
  };

  private registerErrorHandles = (): void => {
    this.app.express.use(errorMiddleware);
  };

  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("Authorization");
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    next();
  };
}

export default new App().app;
