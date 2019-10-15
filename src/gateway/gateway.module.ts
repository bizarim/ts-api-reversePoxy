import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as httpProxy from 'http-proxy-middleware';
import { GatewayService } from './gateway.service';

@Module({
    imports: [],
    controllers: [],
    providers: [GatewayService],
})
export class GatewayModule implements NestModule {
    constructor(private readonly gatewayService: GatewayService) { }

    /**
     * Apply http-proxy-middleware for Gateway Routes.
     * For more information, see: https://github.com/chimurai/http-proxy-middleware
     * @param consumer
     */
    configure(consumer: MiddlewareConsumer) {
        this.gatewayService.getJsonRoutes().map(routeOptions => {

            const proxyPath = routeOptions.path;
            delete routeOptions.path;
            const proxyOptions = {
                ...this.gatewayService.getDefaultOptions(),
                ...routeOptions,
                onError(err, req, res) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Something went wrong. And we are reporting a custom error message.' + err);
                },
                onProxyReq(proxyReq, req, res) {
                    if (req.method == 'POST' && req.body) {
                        const buff = JSON.stringify(req.body);
                        if (req.body) delete req.body;
                        proxyReq.setHeader('content-type', 'application/json');
                        proxyReq.setHeader('content-length', buff.length);
                        proxyReq.write(buff);
                        proxyReq.end();
                    }
                }
            };
            consumer.apply(httpProxy(proxyPath, proxyOptions)).forRoutes('*');
        });
    }
}