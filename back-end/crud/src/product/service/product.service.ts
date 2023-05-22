import { Injectable } from "@nestjs/common";
import { Product } from "../model/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly repository: Repository <Product>,
    ){}

    async getChopps(): Promise<Product[]> {
        return this.repository.find({where: {type: 1}})
    }
}