import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import { json } from "body-parser";
import { requestQueryToJson } from "./middlewares/requestQueryToJson";
import { config } from "./config";
import { responseInJson } from "./middlewares/responseInJson";
import { RouteManager } from "./RouteManager";
import { log } from "./utils/logger";
import { engine } from "express-handlebars";
import { testRoutes } from "./routes/testRoutes";
import { userRoutes } from "./routes/userRoutes";
import { shopRoutes } from "./routes/shopRoutes";
import { tournamentRoutes } from "./routes/tournamentRoutes";
import { authRoutes } from "./routes/authRoutes";
import { apiTemplateController } from "./utils/apiTemplateController";
import { matchRoutes } from "./routes/matchRoutes";

// TODO implement logger
// TODO user request logger
// TODO user access - header x-access-token
(async () => {
  try {
    // declarations
    const app = express();
    const routeManager = new RouteManager();
    // plugins
    app.engine("handlebars", engine());
    app.set("view engine", "handlebars");
    app.set("views", "./src/views");
    app.use(json());
    app.use(compression());
    app.use(cors());
    // custom middlewares
    app.use(requestQueryToJson());
    app.use(responseInJson());
    // domain routes
    routeManager.registerDomain("test", testRoutes); // all test and mock data operation routes
    routeManager.registerDomain("auth", authRoutes); // all auth opeartion routes
    routeManager.registerDomain("user", userRoutes); // all user operation routes
    routeManager.registerDomain("shop", shopRoutes); // all money operation routes
    routeManager.registerDomain("tournament", tournamentRoutes); // all tournament operation routes
    routeManager.registerDomain("match", matchRoutes); // all in tournament match operation routes
    app.use(`/api/sb/${config.DOMAIN}`, routeManager.generateDomainRoutes());
    app.get(
      "/api-document",
      apiTemplateController(routeManager.getRouteData())
    );
    app.use((error: Error, _: any, res: Response, __: any) => {
      res.json({
        success: false,
        result: { errors: [{ message: error.message }] },
      });
    });
    // services
    mongoose.connect(config.MONGO_URI, (err) => {
      if (!err) {
        log.info("MONGO DB CONNECTED");
        app.listen(config.PORT, () => log.info("SERVER STARTED"));
      } else throw new Error(err.message);
    });
  } catch (error: any) {
    console.error(error.message);
  }
})();
