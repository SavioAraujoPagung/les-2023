import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException, HttpCode, HttpStatus, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckIn } from 'src/checkin/model/checkin.entity';
import { Customer } from 'src/customer/model/customer.entity';
import { Repository } from 'typeorm';
import { Cart, ItemCart } from '../model/cart.entity';

@Controller('cart')
export class CartController {
  private logger: Logger;
  constructor(
    @InjectRepository(Cart)
    private readonly repository: Repository<Cart>,
    @InjectRepository(CheckIn)
    private readonly repositoryCheckIn: Repository<CheckIn>,
    @InjectRepository(Customer)
    private readonly repositoryCustomer: Repository<Customer>
    ) {
      this.logger = new Logger('CartControllerRepository');
    }

  @Post()
  async create(@Body() cart: Cart): Promise<Cart> {
    try {
      return this.repository.save(cart);
    } catch (error) {
      this.logger.error(`Não foi possivel inserir no carrinho. ${error}`);
      throw new Error('Erro ao inserrir item no carrinho');
    }
   
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) idCheckIn: number): Promise<Cart> {
    const cart = await this.repository.findOne({where:{ checkInId: idCheckIn }});
    if(!cart){
      throw new NotFoundException('Carrinho não encontrado! Tente novamente!')
    }

    cart.checkIn = await this.repositoryCheckIn.findOneBy({id: cart.checkInId})

    return cart;
  }

  @Get(':id/total-price')
  async getTotalPrice(@Param('id', ParseIntPipe) id: number): Promise<number>{
   
    const cartFound = await this.repository.findOne({where:{ id , isPaid:false}});
    if(!cartFound){
      throw new NotFoundException('Carrinho não encontrado! Tente novamente!')
    }

    let totalPrice = 0;
    cartFound.itensCart.forEach((item) => {
      totalPrice += item.finalPrice;
    });
    return totalPrice
  }

  @Get(':cpf/total-price-costumer')
  async getTotalPriceByCpf(@Param('cpf') cpf: string): Promise<number>{
  
    const customerFound = await this.repositoryCustomer.findOne({where:{ cpf: cpf }});
    if(!customerFound){
      throw new NotFoundException('Cliente não encontrado! Tente novamente!')
    }

    const checkInFound = await this.repositoryCheckIn.findOne({where:{ customer_id: customerFound.id.toString(), status: true }});
    if(!checkInFound){
      throw new NotFoundException('Check In não encontrado! Tente novamente!')
    }
   
    const cartFound = await this.repository.findOne({where:{ checkInId: checkInFound.id, isPaid:false}});
    if(!cartFound){
      throw new NotFoundException('Carrinho não encontrado! Tente novamente!')
    }

    let totalPrice = 0;
    cartFound.itensCart.forEach((item) => {
      totalPrice += item.finalPrice;
    });
    return totalPrice
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() newItensCart: ItemCart): Promise<Cart> {
    const cartFound = await this.repository.findOne({where:{ id , isPaid:false}});

    if(!cartFound){
      throw new NotFoundException('Carrinho não encontrado! Tente novamente!')
    }
    cartFound.itensCart.push(newItensCart)
    await this.repository.update({id}, cartFound)
    return this.repository.findOne({where:{ id }})
  }

  @Put(':id')
  async updatePayment(@Param('id', ParseIntPipe) id: number): Promise<Cart> {
    const cartFound = await this.repository.findOne({where:{ id , isPaid:true}});

    if(!cartFound){
      throw new NotFoundException('Carrinho não encontrado! Tente novamente!')
    }
    cartFound.isPaid = true
    await this.repository.update({id}, cartFound)
    return this.repository.findOne({where:{ id }})
  }

  // @Delete(':id')
  // async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
  //   const checkInFound = await this.repository.findOne({where:{ id }});
  //   if(!checkInFound){
  //     throw new NotFoundException('Check-in não encontrado! Tente novamente!')
  //   }
  //   const checkInDeleted = await this.repository.delete({id})

  //   if(checkInDeleted.affected > 0){
  //     return `Check-in ${id} deletado com sucesso!`;
  //   }
  // }
}
