import { IResponseContext, IUpResult, eErrorCode } from 'ts-common';

export class LogReqeust {
    name: string = 'req';
    guid: string;
    ip: string;
    method: string;
    url: string;
}

export class LogResponse {
    name: string = 'res';
    guid: string;
    context: object | undefined;
    ms: string;
}

export class LogException {
    guid: string;
    message: string;
    stack: string | undefined;
}

export class RscException implements IResponseContext {
    error: string;
    msg: string;

    constructor(err: eErrorCode) {
        if (typeof err === 'number') {
            this.error = `${err}`;
            this.msg = eErrorCode[err];
        } else {
            this.error = `${eErrorCode.Undefined}`;
            this.msg = eErrorCode[eErrorCode.Undefined];
        }
    }
    initialize(rt: IUpResult): IResponseContext {
        return this;
    }
}
