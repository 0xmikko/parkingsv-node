/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { validate, IsNotEmpty } from "class-validator";

export class OpenReq {
  @IsNotEmpty()
  pubkey: string;
}

export class OpenRes {
  timeStamp: number;
  signature: string;
}

export class PayReq {
  @IsNotEmpty()
  tx: string;
}
