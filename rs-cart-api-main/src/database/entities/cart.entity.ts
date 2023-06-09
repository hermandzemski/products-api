import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./cart_item.entity";

enum CartStatus {
  OPEN,
  ORDERED
}

@Entity({ name: 'carts' })
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  id: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'date', nullable: false })
  createdAt: string;

  @Column({ type: 'date', nullable: false })
  updatedAt: string;

  @Column({ type: 'enum', nullable: false, enum: CartStatus })
  status: 'OPEN' | 'ORDERED';

  @OneToMany(() => CartItem, (item) => item.cart)
  // @JoinColumn({ name: 'id', referencedColumnName: 'cart_id'})
  items: CartItem[];
}