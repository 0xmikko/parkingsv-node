/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { Service } from "typedi";
import config from "../config";
import { KeyUtil, ParkingToken } from "parkingsv-contract";
import {compileContract, loadDesc} from "parkingsv-contract/lib/loadContract";
import {tx} from "parkingsv-contract/lib/helper";

@Service()
export class PaymentRepository {
  private contract: ParkingToken;

  constructor() {
    compileContract("token.scrypt")
    const desc = loadDesc("token_desc.json");
    const privateKey = KeyUtil.getPrivateKeyFromWIF(config.privateKey);
    (async () => {
      this.contract = await ParkingToken.fromTransaction(
        privateKey,
        config.fundingTransaction,
        desc
      );

      console.log(this.contract.ledger.toString());
    })();
  }

  async pay(txHex: string) {
    await this.contract.payByJSON(txHex)
  }
}
