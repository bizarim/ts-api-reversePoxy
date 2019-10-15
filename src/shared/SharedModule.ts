import { Module } from '@nestjs/common';
import { SharedService } from '../shared/SharedService';

@Module({
    imports: [],
    controllers: [],
    providers: [SharedService],
    exports: [SharedService],
})
export class SharedModule { }
