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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaseController = void 0;
const common_1 = require("@nestjs/common");
const lease_service_1 = require("./lease.service");
let LeaseController = class LeaseController {
    leaseService;
    constructor(leaseService) {
        this.leaseService = leaseService;
    }
    async getLease(id) {
        const lease = await this.leaseService.getLeaseById(id);
        if (!lease)
            throw new common_1.NotFoundException('Lease not found');
        return lease;
    }
};
exports.LeaseController = LeaseController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LeaseController.prototype, "getLease", null);
exports.LeaseController = LeaseController = __decorate([
    (0, common_1.Controller)('api/lease'),
    __metadata("design:paramtypes", [lease_service_1.LeaseService])
], LeaseController);
//# sourceMappingURL=lease.controller.js.map