/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { Parking } from './../core/parking';
import { Inject, Service } from "typedi";
import { ParkingRepository } from "../repositories/parkingRepository";


@Service()
export class ParkingService {
    @Inject()
    private _repository: ParkingRepository;

    getTerms() : Parking {
        return this._repository.getTerms();
    }
}
