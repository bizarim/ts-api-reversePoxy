"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const http_1 = require("http");
const ts_common_1 = require("ts-common");
const SharedService_1 = require("../shared/SharedService");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(sharedService) {
        this.sharedService = sharedService;
        console.log('LoggingInterceptor');
    }
    intercept(context, next) {
        const startAt = process.hrtime();
        const guid = ts_common_1.generateKey();
        const args = context.getArgs();
        // const msg = context.getArgByIndex<IncomingMessage>(0);
        for (let i = 0; i < args.length; ++i) {
            if (args[i] instanceof http_1.IncomingMessage) {
                const msg = args[i];
                const logReq = { name: 'req', guid: guid, ip: msg.connection.remoteAddress, method: msg.method, url: msg.url };
                // this.sharedService.getLogger().info(JSON.stringify(logReq));
                break;
            }
        }
        return next.handle().pipe(operators_1.map((value) => {
            const res = value === null ? '' : value;
            const endAt = process.hrtime();
            const ms = ((endAt[0] - startAt[0]) * 1e3 + (endAt[1] - startAt[1]) * 1e-6).toFixed(3);
            const logRes = { name: 'res', guid: guid, context: res, ms: ms };
            // this.sharedService.getLogger().info(JSON.stringify(logRes));
            return res;
        }), operators_1.catchError(err => {
            if (err instanceof Error) {
                const logEx = { guid: guid, message: err.message, stack: err.stack };
                // this.sharedService.getLogger().error(JSON.stringify(logEx));
            }
            return rxjs_1.throwError(new common_1.BadGatewayException());
        }));
    }
};
LoggingInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [SharedService_1.SharedService])
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=logging.interceptor.js.map