/*
 * ParkingSV - Interplanetary Parking System
 * Copyright (c) 2020. Mikhail Lazarev
 */

export class Queue<T> {
    _store: T[] = [];
    push(val: T) {
        this._store.push(val);
    }
    pop(): T | undefined {
        return this._store.shift();
    }
}
