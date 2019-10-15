import { Module } from '@nestjs/common';
import { RscHeartBeat } from './heart.model';
import { HeartService } from './heart.service';
import { HeartController } from './heart.controller';
import { SharedModule } from '../shared/SharedModule';

@Module({
    imports: [RscHeartBeat, SharedModule],
    controllers: [HeartController],
    providers: [HeartService],
    exports: [HeartService],
})
export class HeartModule { }
