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
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const otp_entity_1 = require("./entities/otp.entity");
let OtpService = class OtpService {
    otpRepo;
    constructor(otpRepo) {
        this.otpRepo = otpRepo;
    }
    async generateOtp(email) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const otp = this.otpRepo.create({ email, code });
        await this.otpRepo.save(otp);
        return code;
    }
    async verifyOtp(email, code) {
        const otp = await this.otpRepo.findOne({ where: { email, code } });
        if (!otp)
            return false;
        const now = new Date();
        const otpTime = new Date(otp.createdAt);
        const diff = (now.getTime() - otpTime.getTime()) / 1000;
        if (diff > 300)
            return false;
        return true;
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(otp_entity_1.Otp)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OtpService);
//# sourceMappingURL=otp.service.js.map