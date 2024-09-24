import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Brand } from './brands.entity';
import { Category } from './categories.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock?: number;

  @Column({ type: 'varchar' })
  image?: string;

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

  // muchos products a una marca
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  // relacion muchos a muchos
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable() //para crear la tabla ternaria 'solo de un lado de la relacion '
  categories: Category[];
}
