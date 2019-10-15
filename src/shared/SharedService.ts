import 'reflect-metadata';
import { OnModuleInit, Injectable } from '@nestjs/common';
import { MainPath, ILogger } from 'ts-common';

@Injectable()
export class SharedService implements OnModuleInit {

    public env: string = 'dev';
    protected logger: ILogger;
    private static bInit = false;

    async onModuleInit(): Promise<void> {
        await this.initialize(MainPath.get());
    }

    async initialize(path: string): Promise<void> {
        if (true === SharedService.bInit) return;
        if (undefined !== process.env.NODE_ENV) {
            if ('' !== process.env.NODE_ENV) {
                this.env = process.env.NODE_ENV;
            }
        }
    }

    getLogger(): ILogger {
        return this.logger;
    }

}