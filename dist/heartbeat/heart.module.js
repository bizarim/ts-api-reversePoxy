"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const heart_model_1 = require("./heart.model");
const heart_service_1 = require("./heart.service");
const heart_controller_1 = require("./heart.controller");
const SharedModule_1 = require("../shared/SharedModule");
let HeartModule = class HeartModule {
};
HeartModule = __decorate([
    common_1.Module({
        imports: [heart_model_1.RscHeartBeat, SharedModule_1.SharedModule],
        controllers: [heart_controller_1.HeartController],
        providers: [heart_service_1.HeartService],
        exports: [heart_service_1.HeartService],
    })
], HeartModule);
exports.HeartModule = HeartModule;
//# sourceMappingURL=heart.module.js.map