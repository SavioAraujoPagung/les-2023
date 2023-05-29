import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserType {
  Administrador = 1,
  Caixa = 5,
  Cliente = 6,
  Cozinheiro = 7,
  FiscalSaida = 2,
  FiscalEntrada = 3,
  FiscalSelfService = 8,
  Repositor = 4,
  Usuarios = 9
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column()
  gender: string;

  @Column({enum: UserType})
  office: UserType;

  @Column()
  password: string;
}
