import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({type: 'float'}) 
  priceCost: number;

  @Column({type: 'float'}) 
  saleCost: number;

  @Column()
  qtd: number;

  @Column()
  isChopp: boolean;
}
