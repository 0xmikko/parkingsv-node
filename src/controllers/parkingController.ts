/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { getLogger, Logger } from "log4js";
import {
  Get,
  JsonController
} from "routing-controllers";
import { Container, Inject } from "typedi";
import { ParkingService } from "../services/parkingService";


  @JsonController("/api/parking")
  export class ParkingController {
    @Inject()
    private _service: ParkingService;

    private _logger: Logger;

    public constructor() {
      this._logger = getLogger();
      this._logger.level = "debug";
      this._service = Container.get(ParkingService);
    }

    @Get("/")
    async info() {
      return await this._service.getTerms();
    }
  }
