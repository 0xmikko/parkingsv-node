/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {
  SocketController,
  socketListeners,
  SocketPusher,
  SocketE,
} from "../core/socket";
import { Inject, Service } from "typedi";
import { BarrierService } from "../services/barrierService";

@Service()
export class BarriersController implements SocketController {
  @Inject()
  private _service: BarrierService;
  private _namespace = "Barrier";

  constructor() {}

  setPusher(pusher: SocketPusher): void {
    this._service.setPusher(pusher);
  }

  get namespace(): string {
    return this._namespace;
  }

  getListeners(socket: SocketE, userId: string): socketListeners {
    return {
      create: async (dto: {}, opHash: string) => {
        try {
          const info = await this._service.getQRInfo();
          console.log(info);
          socket.emit(this._namespace + ":qrCode", info);
          socket.ok(opHash);
        } catch (e) {
          console.log(e);
          socket.failure(opHash, e);
        }
      },
    };
  }
}
