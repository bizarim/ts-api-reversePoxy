"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_common_1 = require("ts-common");
class LogReqeust {
    constructor() {
        this.name = 'req';
    }
}
exports.LogReqeust = LogReqeust;
class LogResponse {
    constructor() {
        this.name = 'res';
    }
}
exports.LogResponse = LogResponse;
class LogException {
}
exports.LogException = LogException;
class RscException {
    constructor(err) {
        if (typeof err === 'number') {
            this.error = `${err}`;
            this.msg = ts_common_1.eErrorCode[err];
        }
        else {
            this.error = `${ts_common_1.eErrorCode.Undefined}`;
            this.msg = ts_common_1.eErrorCode[ts_common_1.eErrorCode.Undefined];
        }
    }
    initialize(rt) {
        return this;
    }
}
exports.RscException = RscException;
//# sourceMappingURL=logging.model.js.map