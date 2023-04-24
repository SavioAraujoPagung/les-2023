import { Consumption } from 'src/consumption/model/consumption.entity';
import { Customer } from 'src/customer/model/customer.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class CheckIn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: false})
  pago: boolean;

  @Column()
  time: string;

  @ManyToOne(()=> Customer, ({checkins}) => checkins)
  customer: Customer;

  consumptions: Consumption[]
}