import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChoppStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rfid: string;

  @Column({default: 100000})
  qtd: number;

  @Column()
  cost: string;

  // constructor(barcode :string, qtd :number, foodName :string) {
  //   this.foodName = foodName
  //   this.barcode = barcode
  //   this.qtd = qtd
  //   this.status = true
  // }
}
