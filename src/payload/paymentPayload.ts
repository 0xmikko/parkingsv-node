/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { validate, IsNotEmpty } from "class-validator";

export class StartParkingReq {
  @IsNotEmpty()
  pubkey: string;
}

export class StartParkingRes {
  timestamp: number;
}

export class PayReq {
  @IsNotEmpty()
  tx: string;
}
