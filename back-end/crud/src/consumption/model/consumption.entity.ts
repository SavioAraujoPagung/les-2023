import { CheckIn } from 'src/checkin/model/checkin.entity';
import { ProductConsumption } from 'src/productConsumption/model/ProductConsumption.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Consumption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=> CheckIn, ({consumptions}) => consumptions)
  checkin: CheckIn;

  @ManyToOne(()=> ProductConsumption)
  productConsumption: ProductConsumption;

  @Column()
  productId: number; 

  @Column()
  qtd: number; 

  @Column()
  price: number;
}
