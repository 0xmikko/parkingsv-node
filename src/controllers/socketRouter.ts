/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import SocketIO, { Socket } from "socket.io";
import socketioJwt from "socketio-jwt";
import config from "../config";
import { SocketUpdate } from "../core/operations";
import { Queue } from "../core/types";
import { SocketController, SocketPusher, SocketE } from "../core/socket";

export class SocketRouter implements SocketPusher {
  private readonly socketsPool: Record<string, Socket> = {};
  private readonly _controllers: SocketController[];
  private readonly _updateQueue = new Queue<SocketUpdate>();

  constructor(controllers: SocketController[]) {
    this._controllers = [...controllers];
    controllers.forEach((cnt) => cnt.setPusher(this));
    setTimeout(() => this.updateQueue(), 5000);
  }

  connect(io: SocketIO.Server) {
    const nsp = io.of("/");
    nsp.on("connection", (socket) => {
      socket.on("auth", (code: string) => {
        this._onNewAuthSocket.bind(this)(socket as SocketE, code);
      });
    });
  }

  // Connect new socket to pool
  private _onNewAuthSocket(socket: SocketE, code: string) {
    // Add new socket in socketsPool connection array
    this.socketsPool[code] = socket;
    socket.emit("authenticated", {});
    console.log(`[SOCKET.IO] : barrier ${code} connected`);

    // Middleware to show all incoming requests
    socket.use((packet, next) => {
      console.log(`[SOCKET.IO] : INCOMING REQUEST ${packet[0]}`);
      next();
    });

    // Add delete listener
    socket.on("disconnect", () => {
      //this socket is authenticated, we are good to handle more events from it.
      console.log(`bye ${code}`);
      delete this.socketsPool[code];
    });

    socket.ok = (opHash: string) => {
      socket.emit("operations:update", {
        id: opHash,
        status: "STATUS.SUCCESS",
      });
    };

    socket.failure = (opHash, error) => {
      socket.emit("operations:update", {
        id: opHash,
        status: "STATUS.FAILURE",
        error,
      });
    };

    // Add listeners from all controllers
    for (const controller of this._controllers) {
      const listeners = controller.getListeners(socket, code);

      const { namespace } = controller;
      Object.entries(listeners).map((l) => {
        const event = l[0];
        const handler = l[1];
        socket.on(
          namespace + ":" + event,
          this.loggerMiddleware(namespace, event, handler)
        );
      });
      console.log(`[SOCKET.IO] : ${namespace} | listeners connected`);
    }
  }

  private loggerMiddleware(
    namespace: string,
    event: string,
    fn: (...args: any[]) => Promise<void>
  ): any {
    return async function (...args: any[]) {
      const start = Date.now();
      await fn(...args);
      const finish = Date.now();
      console.log(
        `[SOCKET.IO] : ${namespace} | ${event} | ${finish - start} ms`
      );
    };
  }

  public pushUpdateQueue(event: SocketUpdate) {
    // ToDo: Add hash skipping
    this._updateQueue.push(event);
  }

  private async updateQueue() {
    while (await this.updateQueueElm()) {}
    setTimeout(() => this.updateQueue(), 100);
  }

  private async updateQueueElm(): Promise<boolean> {
    let msg: SocketUpdate | undefined;
    msg = this._updateQueue.pop();

    if (msg === undefined) return false;
    console.log("UPDATE", msg);
    const code = msg.code;
    const barrierSocket = this.socketsPool[code];

    if (barrierSocket === undefined) {
      return false;
    }
    barrierSocket.emit(msg.event, "open");

    return true;
  }
}
