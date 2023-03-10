import { Repository } from 'typeorm';
import { User } from '../model/user.entity';
export declare class UserController {
    private readonly repository;
    private logger;
    constructor(repository: Repository<User>);
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, user: User): Promise<User>;
    delete(id: number): Promise<string>;
    login(login: {
        email: string;
        password: string;
    }): Promise<boolean>;
}
