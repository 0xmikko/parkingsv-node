/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import express, { Application } from "express";
import { useExpressServer } from "routing-controllers";
import { DefaultErrorHandler } from "./middleware/errorHandler";
import { morganLogger } from "./middleware/morganLogger";
import { Container } from "typedi";
import { SocketRouter } from "./controllers/socketRouter";
import { PaymentController } from "./controllers/paymentController";
import { BarriersController } from "./controllers/barrierController";

export const createApp = async (): Promise<Application> => {
  console.log(process.env);

  const app = express();
  app.use(morganLogger);
  useExpressServer(app, {
    controllers: [PaymentController],
    cors: {
      origin: "*",
    },
    middlewares: [DefaultErrorHandler],
    validation: true,
  });

  // ERROR HANDLER
  // app.use(errorHandler);
  let server = require("http").Server(app);

  // set up socket.io and bind it to our
  // http server.
  let io = require("socket.io").listen(server, {
    origins: "*:*",
    pingTimeout: 50000,
    pingInterval: 50000,
  });
  try {
    const barrierController = Container.get(BarriersController);
    const socketRouter = new SocketRouter([barrierController]);
    socketRouter.connect(io);
  } catch (e) {
    console.log("Cant start socket controllers", e);
  }

  return server;
};
