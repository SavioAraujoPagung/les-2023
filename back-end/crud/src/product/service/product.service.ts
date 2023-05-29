import { Injectable } from "@nestjs/common";
import { NewProduct, Product } from "../model/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, MoreThan, Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly repository: Repository <Product>,
        @InjectRepository(NewProduct)
        private readonly repositoryNP: Repository <NewProduct>,
    ){}

    async getChopps(): Promise<Product[]> {
        return this.repository.find({where: {type: 1}})
    }

    async getGenericyOnline(type: number): Promise<Product[]> {
        return this.repository.find({
                where: {
                    type: type,
                    qtd: MoreThan(0)
                }
            }
        )
    }

    async getAll(): Promise<Product[]> {
        return this.repository.find()
    }

    async getSolicitations(start: Date, end: Date): Promise<NewProduct[]> {
        return this.repositoryNP.find(
            {
                where: {
                    created: MoreThan(start) && LessThan(end)
                }
            }
        )
    }

    async getSolicitationsAllUntil(until: Date): Promise<NewProduct[]> {
        return this.repositoryNP.find(
            {
                where: {
                    created: LessThan(until)
                }
            }
        )
    }

    async getProducts(): Promise<Product[]> {
        return this.repository.find({where: {type: 3}})
    }
}