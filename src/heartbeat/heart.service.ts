import { Injectable } from '@nestjs/common';
import { RscHeartBeat } from './heart.model';

@Injectable()
export class HeartService {
    constructor() { }
    public async beat(): Promise<RscHeartBeat> {
        // throw new Error('test');
        return { error: '0', msg: 'success' } as RscHeartBeat;
    }
}
