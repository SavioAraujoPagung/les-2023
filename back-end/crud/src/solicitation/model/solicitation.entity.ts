import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Solicitation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  foodName: string;

  @Column({default: 1, type: 'float'})
  qtd: number;

  @Column({default: true})
  status: boolean;
}
