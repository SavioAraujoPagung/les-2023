
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Stock {
  @PrimaryColumn()
  barcode: string;

  @Column()
  name: string;

  @Column({default: 0})
  qtd: number;
  
}
