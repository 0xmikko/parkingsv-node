/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { getLogger, Logger } from "log4js";
import { Body, JsonController, Post } from "routing-controllers";
import { Container, Inject } from "typedi";
import { OpenReq } from "../payload/paymentPayload";
import { PaymentService } from "../services/paymentService";

@JsonController("/api/payments")
export class PaymentController {
  @Inject()
  private _service: PaymentService;

  private _logger: Logger;

  public constructor() {
    this._logger = getLogger();
    this._logger.level = "debug";
    this._service = Container.get(PaymentService);
  }

  @Post("/open")
  async open(@Body() req: OpenReq) {
    return await this._service.startParking(req);
  }

  @Post("/pay")
  async pay(@Body() req: OpenReq) {
    return await this._service.startParking(req);
  }
}
