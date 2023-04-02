import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryColumn()
  rfid: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  dateBirth: string;
}
