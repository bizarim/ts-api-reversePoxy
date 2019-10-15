import { Injectable } from '@nestjs/common';
import { IGatewayService } from './gateway.interface';
import { MainPath, ConfigLoader } from 'ts-common';

@Injectable()
export class GatewayService implements IGatewayService {

    loader: ConfigLoader = new ConfigLoader();

    getDefaultOptions(): object {
        return {
            logLevel: 'debug',
            changeOrigin: true,
            prependPath: false,
        };
    }

    getJsonRoutes(): any {
        return this.loader.toJson(`${MainPath.get()}/config/proxy.${this.loader.getEnv()}.json`);
    }
}
