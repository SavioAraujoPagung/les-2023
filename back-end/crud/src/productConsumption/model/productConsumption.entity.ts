import { Consumption } from 'src/consumption/model/Consumption.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductConsumption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; 

  @Column()
  qtd: number; 

  @Column()
  price: number;
}
