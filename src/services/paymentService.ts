/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { Payment } from './../core/payment';
import {Container, Inject, Service} from "typedi";
import { PaymentRepository } from "../repositories/paymentRepository";
import { SocketUpdate } from "../core/operations";

import { v4 as uuidv4 } from "uuid";
import { StartParkingReq, StartParkingRes } from '../payload/paymentPayload';

@Service()
export class PaymentService {

  @Inject()
  private _paymentRepository: PaymentRepository;

  private _updateQueue: SocketUpdate[] = [];

  constructor() {
    this._paymentRepository = Container.get(PaymentRepository);
  }


  startParking(dto: StartParkingReq) : StartParkingRes {

    const timeStamp =  Date.now();
    return {
      timestamp: timeStamp,
    }
  }

  getUpdateQueue(): SocketUpdate[] {
    const copy = [...this._updateQueue];
    this._updateQueue = [];
    return copy;
  }
}
