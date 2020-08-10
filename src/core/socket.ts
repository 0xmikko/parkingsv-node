/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

import SocketIO from "socket.io";
import {SocketUpdate} from "./operations";

export type socketListeners = Record<string, (...args: any[]) => Promise<void>>;

export interface SocketPusherDelegateI {
    setPusher(pusher: SocketPusher): void;
}

export interface SocketController extends SocketPusherDelegateI {
    namespace: string;
    getListeners: (socket: SocketE, userId: string) => socketListeners;
}

export interface SocketPusher {
    pushUpdateQueue(event: SocketUpdate): void
}

export interface SocketE extends SocketIO.Socket, SocketPusher {
    ok: (opHash: string) => void;
    failure: (opHash: string, error: string) => void;
}
