import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';
import { Order } from './order.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

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

  //relacion bidireccionar
  @OneToOne(
    () => User,
    (user) => user.customer, //referencia a la tabla
    { nullable: true },
  )
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
