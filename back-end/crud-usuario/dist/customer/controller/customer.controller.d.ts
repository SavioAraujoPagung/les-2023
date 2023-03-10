import { Repository } from 'typeorm';
import { Customer } from '../model/customer.entity';
export declare class CustomerController {
    private readonly repository;
    private logger;
    constructor(repository: Repository<Customer>);
    create(customer: Customer): Promise<Customer>;
    findAll(): Promise<Customer[]>;
    findOne(id: number): Promise<Customer>;
    update(id: number, customer: Customer): Promise<Customer>;
    delete(id: number): Promise<string>;
}
