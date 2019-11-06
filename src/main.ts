import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MainPath, ConfigLoader, ServerConfig } from 'ts-common';
import { SharedService } from './shared/SharedService';

MainPath.set(__dirname);

async function bootstrap() {
    const loader = new ConfigLoader();
    const path = `${MainPath.get()}/config/svr.${loader.getEnv()}.json`;
    const config = loader.toJson(path) as ServerConfig;
    console.log(path);
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: !loader.isDev() }));
    await app.listen(config.port);
}

bootstrap().then(async () => {
    const shared = new SharedService();
    await shared.onModuleInit();
    // shared.getLogger().info('run');
});
