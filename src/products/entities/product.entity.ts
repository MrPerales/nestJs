import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Brand } from './brands.entity';
import { Category } from './categories.entity';

@Entity({ name: 'products' }) //nombre de la tabla en sql
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
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  // muchos products a una marca
  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  // relacion muchos a muchos
  @ManyToMany(() => Category, (category) => category.products)
  //para crear la tabla ternaria 'solo de un lado de la relacion '
  @JoinTable({
    name: 'product_categories', //nombre de la tabla
    joinColumn: {
      name: 'product_id', //nombre de la primera columna
    },
    inverseJoinColumn: {
      name: 'category_id', //nombre de la segunda columna
    },
  })
  categories: Category[];
}
