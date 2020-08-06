/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { getLogger, Logger } from "log4js";
import { Get, Body, JsonController } from "routing-controllers";
import { Container, Inject } from "typedi";
import { ParkingService } from "../services/parkingService";
import { PaymentService } from "../services/paymentService";
import { StartParkingReq } from "../payload/paymentPayload";
import { Post } from "routing-controllers/index";

@JsonController("/api/parking")
export class ParkingController {
  @Inject()
  private _service: ParkingService;
  private _paymentService: PaymentService;
  private _logger: Logger;

  public constructor() {
    this._logger = getLogger();
    this._logger.level = "debug";
    this._service = Container.get(ParkingService);
  }

  @Get("/")
  info() {
    return this._service.getTerms();
  }

  @Post("/start")
  async open(@Body() req: StartParkingReq) {
    return await this._paymentService.startParking(req);
  }

  @Post("/pay")
  async pay(@Body() req: StartParkingReq) {
    return await this._paymentService.startParking(req);
  }
}
