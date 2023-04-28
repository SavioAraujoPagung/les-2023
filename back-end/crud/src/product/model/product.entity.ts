import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  priceCost: string;

  @Column()
  saleCost: string;

  @Column()
  qtd: number;
}
