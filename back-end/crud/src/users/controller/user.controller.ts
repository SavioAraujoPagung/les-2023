import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserType } from '../model/user.entity';

@Controller('users')
export class UserController {
  private logger: Logger;
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
    ) {
      this.logger = new Logger('UserControllerRepository');
    }

  @Post()
  async create(@Body() user: User): Promise<User> {
    if (!UserType[user.office]) {
      throw new BadRequestException('Cargo inválido!');
    }

    try { 
      return this.repository.save(user);
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar um usuário. ${error}`);
      throw new BadRequestException('Impossível cadastrar esse usuário');
    }
   
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
    await this.repository.update({id}, user)
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
  async login(@Body() login: {email: string, password: string}): Promise<User> {
    const email = login.email;
    const password = login.password;
    const user = await this.repository.findOne({where:{ email, password }});
    if(!user){
      throw new NotFoundException('Usuário não encontrado! Tente novamente!')
    }
    return user;
  }
}
