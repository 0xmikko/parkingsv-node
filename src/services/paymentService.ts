/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {Container, Inject, Service} from "typedi";
import {PaymentRepository} from "../repositories/paymentRepository";
import {PayReq, StartParkingReq, StartParkingRes,} from "../payload/paymentPayload";
import {BarrierService} from "./barrierService";

@Service()
export class PaymentService {
  @Inject()
  private _paymentRepository: PaymentRepository;

  @Inject()
  private _barrierService: BarrierService;

  private _carsInParking = new Map<string, number>();

  constructor() {
    this._paymentRepository = Container.get(PaymentRepository);
    this._barrierService = Container.get(BarrierService);
  }

  startParking(dto: StartParkingReq): StartParkingRes {
    const timeStamp = Date.now();
    this._carsInParking.set(dto.pubkey, timeStamp);
    return {
      timestamp: timeStamp,
    };
  }

  async pay(dto: PayReq) {
    try {
      await this._paymentRepository.pay(dto.txHex);
      this._barrierService.openBarrier(dto.code);
    } catch (e) {
      console.log(e)
    }
  }
}
