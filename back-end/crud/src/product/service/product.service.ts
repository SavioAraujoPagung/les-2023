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

    async getSolicitations(start: Date, end: Date): Promise<NewProduct[]> {
        return this.repositoryNP.find(
            {
                where: {
                    created: MoreThan(start) && LessThan(end)
                }
            }
        )
    }
}