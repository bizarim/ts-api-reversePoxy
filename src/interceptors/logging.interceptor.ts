import { CallHandler, ExecutionContext, Injectable, NestInterceptor, BadGatewayException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IncomingMessage } from 'http';
import { generateKey } from 'ts-common';
import { LogReqeust, LogResponse, LogException } from './logging.model';
import { SharedService } from '../shared/SharedService';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {


    constructor(private sharedService: SharedService) {
        console.log('LoggingInterceptor');
    }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const startAt = process.hrtime();

        const guid = generateKey();
        const args = context.getArgs();
        // const msg = context.getArgByIndex<IncomingMessage>(0);

        for (let i = 0; i < args.length; ++i) {
            if (args[i] instanceof IncomingMessage) {
                const msg = args[i] as IncomingMessage;
                const logReq = { name: 'req', guid: guid, ip: msg.connection.remoteAddress, method: msg.method, url: msg.url } as LogReqeust;
                this.sharedService.getLogger().info(JSON.stringify(logReq));
                break;
            }
        }

        return next.handle().pipe(
            map((value) => {
                const res = value === null ? '' : value;
                const endAt = process.hrtime();
                const ms = ((endAt[0] - startAt[0]) * 1e3 + (endAt[1] - startAt[1]) * 1e-6).toFixed(3);
                const logRes = { name: 'res', guid: guid, context: res, ms: ms } as LogResponse;
                this.sharedService.getLogger().info(JSON.stringify(logRes));
                return res;
            }),
            catchError(err => {

                if (err instanceof Error) {
                    const logEx = { guid: guid, message: err.message, stack: err.stack } as LogException;
                    this.sharedService.getLogger().error(JSON.stringify(logEx));
                }
                return throwError(new BadGatewayException());
            }),
        );
    }
}
