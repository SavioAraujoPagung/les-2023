import { Controller, Get, Post, Put, Delete, Body, Param, Inject, ParseIntPipe, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user.entity';

@Controller('users')
export class UserController {
  
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
    ) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.repository.save(user);
  }
  
  @Get()
  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.repository.findOne({where:{ id }});
    if(!user){
      throw new NotFoundException('Usuário não encontrado! Tente novamente!')
    }
    return user;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() user: User): Promise<User> {
    const userFound = await this.repository.findOne({where:{ id }});
    if(!userFound){
      throw new NotFoundException('Usuário não encontrado! Tente novamente!')
    }
    this.repository.update({id}, user)
    return this.repository.findOne({where:{ id }})
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const userFound = await this.repository.findOne({where:{ id }});
    if(!userFound){
      throw new NotFoundException('Usuário não encontrado! Tente novamente!')
    }
    const userDeleted = await this.repository.delete({id})

    if(userDeleted.affected > 0){
      return `Usuário ${id} deletado com sucesso!`;
    }
  }

  @Post('/login')
  async login(@Body() login: {email: string, password: string}): Promise<boolean> {
    const email = login.email;
    const password = login.password;
    const user = await this.repository.findOne({where:{ email, password }});
    if(!user){
      throw new NotFoundException('Usuário não encontrado! Tente novamente!')
    }
    return true;
  }
}
