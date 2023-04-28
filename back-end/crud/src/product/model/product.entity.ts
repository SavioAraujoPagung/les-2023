import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

export enum ProductType {
  chopp = 1,
  selfService = 2,
  another = 3
}

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

  @Column({type: 'float'})
  qtd: number;

  @Column({enum: ProductType})
  type: ProductType;
}
