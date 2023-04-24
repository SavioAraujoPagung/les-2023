import { CheckIn } from 'src/checkin/model/checkin.entity';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';

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

  @OneToMany(() => CheckIn, ({ customer }) => customer)
  checkins: CheckIn[];

  @Column({default: true})
  active: boolean;
}
