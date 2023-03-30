import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class SolicitationStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  foodName: string;

  @Column()
  barcode: string;

  @Column({default: 1})
  qtd: number;

  @Column({default: true})
  status: boolean;

  constructor(barcode :string, qtd :number, foodName :string) {
    this.foodName = foodName
    this.barcode = barcode
    this.qtd = qtd
    this.status = true
  }
}

class SolicitationDTO {
  barcode: string;
  qtd: number;
}

export { SolicitationStock, SolicitationDTO }