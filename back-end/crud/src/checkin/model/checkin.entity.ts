import { Customer } from 'src/customer/model/customer.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CheckIn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rfid: string;

  @Column()
  status: boolean;

  @Column()
  customer_id: string;

  customer: Customer;
}
