import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { HeartService } from './heart.service';
import { RscHeartBeat } from './heart.model';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('heart')
export class HeartController {
    constructor(private readonly heartService: HeartService) { }

    @Get('beat')
    async login(): Promise<RscHeartBeat> {
        return await this.heartService.beat();
    }
}
