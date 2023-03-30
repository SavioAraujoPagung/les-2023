import { CheckIn } from 'src/checkin/model/checkin.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type ItemCart = {
  name: string;
  finalPrice: number
}
@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'jsonb', nullable:true})
  itensCart: ItemCart[];
  
  @Column({default:false})
  isPaid: boolean;

  @Column()
  checkInId: number;

  checkIn: CheckIn;
}
