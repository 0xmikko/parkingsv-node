/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { validate, IsNotEmpty } from "class-validator";
import {KeyUtil} from "parkingsv-contract";

export class Config {
  static port: number;

  @IsNotEmpty()
  static id: string;

  @IsNotEmpty()
  static node: string;

  @IsNotEmpty()
  static parkingName: string;

  @IsNotEmpty()
  static price1h: number;

  @IsNotEmpty()
  static price2h: number;

  @IsNotEmpty()
  static price24h: number;

  @IsNotEmpty()
  static pubkey: string;

  @IsNotEmpty()
  static privateKey: string;

  @IsNotEmpty()
  static fundingTransaction: string;

  static init() {
    Config.port = parseInt(process.env.PORT || "4000");
    Config.id = process.env.PARKING_ID || "";
    Config.node = process.env.NODE || "";
    Config.parkingName = process.env.PARKING_NAME || "";
    Config.price1h = parseInt(process.env.PRICE_1H || "0");
    Config.price2h = parseInt(process.env.PRICE_2H || "0");
    Config.price24h = parseInt(process.env.PRICE_24H || "0");
    Config.privateKey = process.env.PRIVATEKEY || "";
    Config.pubkey = KeyUtil.getAddress(Config.privateKey);
    Config.fundingTransaction = process.env.FUNDING_TRANSACTION || "";

  }

  static async validate(): Promise<void> {
    console.log("Loading configuration...");
    Config.init();
    const errors = await validate(Config);
    if (errors.length > 0)
      throw new Error(`Configuration problems: ${errors.join("\n")}`);
  }
}

Config.init();

export default Config;
