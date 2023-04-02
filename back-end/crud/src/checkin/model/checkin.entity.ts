import { Customer } from 'src/customer/model/customer.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class CheckIn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: false})
  pago: boolean;

  @Column()
  time: string;

  @ManyToOne(()=> Customer)
  customer: Customer;
}
