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
  time: Date;

  @ManyToOne(()=> Customer, ({checkins}) => checkins)
  customer: Customer;

  @OneToMany(() => Consumption, ({ checkin }) => checkin)
  consumptions: Consumption[]

  @Column({nullable: true, type: 'float'})
  totalPayment: number;
}