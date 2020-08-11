/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { getLogger, Logger } from "log4js";
import { Get, Body, JsonController } from "routing-controllers";
import { Container, Inject } from "typedi";
import { ParkingService } from "../services/parkingService";
import { PaymentService } from "../services/paymentService";
import {PayReq, StartParkingReq} from "../payload/paymentPayload";
import {Controller, Post} from "routing-controllers/index";

@JsonController("/api/parking")
export class ParkingController {
  @Inject()
  private _service: ParkingService;

  @Inject()
  private _paymentService: PaymentService;


  private _logger: Logger;

  constructor() {
    this._logger = getLogger();
    this._logger.level = "debug";
    this._service = Container.get(ParkingService);
    this._paymentService = Container.get(PaymentService);
  }

  @Get("/")
  info() {
    return this._service.getTerms();
  }

  @Post("/start")
  start(@Body() req: StartParkingReq) {
    return this._paymentService.startParking(req);
  }

  @Post("/pay")
  async pay(@Body() req: PayReq) {
    await this._paymentService.pay(req);
    return "ok"
  }
}
