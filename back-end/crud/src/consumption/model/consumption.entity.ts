import { CheckIn } from 'src/checkin/model/checkin.entity';
import { Product } from 'src/product/model/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Consumption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=> CheckIn, ({consumptions}) => consumptions)
  checkin: CheckIn;

  @ManyToOne(()=> Product)
  product: Product;

  @Column()
  productId: string; 

  @Column({type: 'float'})
  qtd: number; 

  @Column({type: 'float'})
  price: number;
  
  @Column()
  created: Date
}
