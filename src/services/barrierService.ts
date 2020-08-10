/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { Inject, Service } from "typedi";
import { ParkingRepository } from "../repositories/parkingRepository";
import { Parking } from "../core/parking";
import { SocketPusher, SocketPusherDelegateI } from "../core/socket";

@Service()
export class BarrierService implements SocketPusherDelegateI {
  @Inject()
  private _repository: ParkingRepository;

  private _pusher: SocketPusher;

  getQRInfo(): Parking {
    return this._repository.getTerms();
  }

  setPusher(pusher: SocketPusher): void {
    this._pusher = pusher;
  }

  openBarrier(code: string) {
    this._pusher.pushUpdateQueue({
      code,
      event: "barrier:open",
    });
  }
}
