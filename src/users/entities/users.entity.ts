import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Customer } from './customer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  nickname: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar' })
  mail: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  // relacion
  @OneToOne(
    () => Customer,
    (customer) => customer.user, //referencia a la tabla
    { nullable: true }, //nullable porque puede que un usuario no sea cliente
  )
  @JoinColumn() //crea la referencia para poder enlasar hacia el customer ,
  //  la tabla user va a cargar con la relacion por el JoinColumn()
  // nota: solo se le aplica a una de las dos tablas que van a tener la relacion
  customer: Customer;
}
