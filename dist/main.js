"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const ts_common_1 = require("ts-common");
const SharedService_1 = require("./shared/SharedService");
ts_common_1.MainPath.set(__dirname);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const loader = new ts_common_1.ConfigLoader();
        const path = `${ts_common_1.MainPath.get()}/config/svr.${loader.getEnv()}.json`;
        const config = loader.toJson(path);
        console.log(path);
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalPipes(new common_1.ValidationPipe({ disableErrorMessages: !loader.isDev() }));
        yield app.listen(config.port);
    });
}
bootstrap().then(() => __awaiter(void 0, void 0, void 0, function* () {
    const shared = new SharedService_1.SharedService();
    yield shared.onModuleInit();
    // shared.getLogger().info('run');
}));
//# sourceMappingURL=main.js.map