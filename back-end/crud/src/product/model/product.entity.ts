import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';

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

  @Column({nullable: true})
  minQtd: number;

  @Column({enum: ProductType})
  type: ProductType;

  @OneToMany(() => NewProduct, ({ product }) => product)
  inbounds: NewProduct[];
}

@Entity()
export class NewProduct {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(()=> Product, ({inbounds}) => inbounds)
  product: Product

  @Column({type: 'float'})
  totalPrice: number

  @Column()
  created: Date

  constructor(product: Product, totalPrice: number){
    this.product = product
    this.totalPrice = totalPrice
    this.created = new Date()
  }
}
