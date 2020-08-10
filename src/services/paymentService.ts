/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { Payment } from "./../core/payment";
import { Container, Inject, Service } from "typedi";
import { PaymentRepository } from "../repositories/paymentRepository";
import { SocketUpdate } from "../core/operations";

import { v4 as uuidv4 } from "uuid";
import {
  PayReq,
  StartParkingReq,
  StartParkingRes,
} from "../payload/paymentPayload";
import { BarrierService } from "./barrierService";

@Service()
export class PaymentService {
  @Inject()
  private _paymentRepository: PaymentRepository;

  @Inject()
  private _barrierService: BarrierService;

  constructor() {
    this._paymentRepository = Container.get(PaymentRepository);
    this._barrierService = Container.get(BarrierService);
  }

  startParking(dto: StartParkingReq): StartParkingRes {
    const timeStamp = Date.now();
    this._barrierService.openBarrier('BARRIER1');
    return {
      timestamp: timeStamp,
    };
  }

  async pay(dto: PayReq) {
    await this._paymentRepository.pay(dto.txHex);
    this._barrierService.openBarrier(dto.code);
  }
}
