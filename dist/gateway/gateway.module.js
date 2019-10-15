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
const httpProxy = require("http-proxy-middleware");
const gateway_service_1 = require("./gateway.service");
let GatewayModule = class GatewayModule {
    constructor(gatewayService) {
        this.gatewayService = gatewayService;
    }
    /**
     * Apply http-proxy-middleware for Gateway Routes.
     * For more information, see: https://github.com/chimurai/http-proxy-middleware
     * @param consumer
     */
    configure(consumer) {
        this.gatewayService.getJsonRoutes().map(routeOptions => {
            const proxyPath = routeOptions.path;
            delete routeOptions.path;
            const proxyOptions = Object.assign(Object.assign(Object.assign({}, this.gatewayService.getDefaultOptions()), routeOptions), { onError(err, req, res) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Something went wrong. And we are reporting a custom error message.' + err);
                },
                onProxyReq(proxyReq, req, res) {
                    if (req.method == 'POST' && req.body) {
                        const buff = JSON.stringify(req.body);
                        if (req.body)
                            delete req.body;
                        proxyReq.setHeader('content-type', 'application/json');
                        proxyReq.setHeader('content-length', buff.length);
                        proxyReq.write(buff);
                        proxyReq.end();
                    }
                } });
            consumer.apply(httpProxy(proxyPath, proxyOptions)).forRoutes('*');
        });
    }
};
GatewayModule = __decorate([
    common_1.Module({
        imports: [],
        controllers: [],
        providers: [gateway_service_1.GatewayService],
    }),
    __metadata("design:paramtypes", [gateway_service_1.GatewayService])
], GatewayModule);
exports.GatewayModule = GatewayModule;
//# sourceMappingURL=gateway.module.js.map