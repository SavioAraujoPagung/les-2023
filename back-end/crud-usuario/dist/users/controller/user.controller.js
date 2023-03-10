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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../model/user.entity");
let UserController = class UserController {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger('UserControllerRepository');
    }
    async create(user) {
        console.log(user);
        try {
            return this.repository.save(user);
        }
        catch (error) {
            this.logger.error(`Não foi possivel cadastrar um usuário. ${error}`);
            throw new Error('Erro ao cadastrar um usuário');
        }
    }
    async findAll() {
        return this.repository.find();
    }
    async findOne(id) {
        const user = await this.repository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado! Tente novamente!');
        }
        return user;
    }
    async update(id, user) {
        const userFound = await this.repository.findOne({ where: { id } });
        if (!userFound) {
            throw new common_1.NotFoundException('Usuário não encontrado! Tente novamente!');
        }
        this.repository.update({ id }, user);
        return this.repository.findOne({ where: { id } });
    }
    async delete(id) {
        const userFound = await this.repository.findOne({ where: { id } });
        if (!userFound) {
            throw new common_1.NotFoundException('Usuário não encontrado! Tente novamente!');
        }
        const userDeleted = await this.repository.delete({ id });
        if (userDeleted.affected > 0) {
            return `Usuário ${id} deletado com sucesso!`;
        }
    }
    async login(login) {
        const email = login.email;
        const password = login.password;
        const user = await this.repository.findOne({ where: { email, password } });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado! Tente novamente!');
        }
        return true;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map