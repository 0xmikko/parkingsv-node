/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { Payment } from './../core/payment';
import { Inject, Service } from "typedi";
import { PaymentRepository } from "../repositories/paymentRepository";
import { SocketUpdate } from "../core/operations";

import { v4 as uuidv4 } from "uuid";
import { OpenReq, OpenRes } from '../payload/paymentPayload';

@Service()
export class PaymentService {

  @Inject()
  private _paymentRepository: PaymentRepository;

  private _updateQueue: SocketUpdate[] = [];

  async startParking(dto: OpenReq) : Promise<OpenRes> {
    return {
      timeStamp: Date.now(),
      signature: "Date signature",
    }
  }

  getUpdateQueue(): SocketUpdate[] {
    const copy = [...this._updateQueue];
    this._updateQueue = [];
    return copy;
  }
}
