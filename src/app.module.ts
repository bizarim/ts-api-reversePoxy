import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { HeartModule } from './heartbeat/heart.module';
import { SharedModule } from './shared/SharedModule';

@Module({
    imports: [GatewayModule, HeartModule, SharedModule],
    controllers: [],
    providers: [
    ],
})
export class AppModule {
    constructor() { }
}
