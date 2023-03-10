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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("../model/customer.entity");
let CustomerController = class CustomerController {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger('CustomerControllerRepository');
    }
    async create(customer) {
        try {
            return this.repository.save(customer);
        }
        catch (error) {
            this.logger.error(`Não foi possivel cadastrar um cliente. ${error}`);
            throw new Error('Erro ao cadastrar um cliente');
        }
    }
    async findAll() {
        return this.repository.find();
    }
    async findOne(id) {
        const user = await this.repository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('Cliente não encontrado! Tente novamente!');
        }
        return user;
    }
    async update(id, customer) {
        const userFound = await this.repository.findOne({ where: { id } });
        if (!userFound) {
            throw new common_1.NotFoundException('Cliente não encontrado! Tente novamente!');
        }
        this.repository.update({ id }, customer);
        return this.repository.findOne({ where: { id } });
    }
    async delete(id) {
        const userFound = await this.repository.findOne({ where: { id } });
        if (!userFound) {
            throw new common_1.NotFoundException('Cliente não encontrado! Tente novamente!');
        }
        const userDeleted = await this.repository.delete({ id });
        if (userDeleted.affected > 0) {
            return `Cliente ${id} deletado com sucesso!`;
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_entity_1.Customer]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, customer_entity_1.Customer]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "delete", null);
CustomerController = __decorate([
    (0, common_1.Controller)('customer'),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map