/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { Parking } from "../core/parking";
import { Inject, Service } from "typedi";
import config from "../config";

@Service()
export class ParkingRepository {
  private _parking: Parking;

  constructor() {
    this._parking = {
      id: config.id,
      node: config.node,
      name: config.parkingName,
      price1h: config.price1h,
      price2h: config.price2h,
      price24h: config.price24h,
      pubkey: config.pubkey,
    };
  }

  getTerms(): Parking {
    return this._parking;
  }
}
