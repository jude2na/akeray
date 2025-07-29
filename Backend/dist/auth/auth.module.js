"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const users_module_1 = require("../iam/users/users.module");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const roles_guard_1 = require("./guards/roles.guard");
const admin_module_1 = require("../admin/admin.module");
const owner_module_1 = require("../owner/owner.module");
const tenant_module_1 = require("../tenant/tenant.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            jwt_1.JwtModule.register({}),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => tenant_module_1.TenantModule),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, roles_guard_1.RolesGuard],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map