/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

export interface Parking {
  id: string;
  node: string;
  name: string;
  price1h: number;
  price2h: number;
  price24h: number;
  pubkey: string;
}
