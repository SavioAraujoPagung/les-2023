import { CheckIn } from 'src/checkin/model/checkin.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class CheckOut {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: string;

  @ManyToOne(()=> CheckIn)
  checkin: CheckIn;
}