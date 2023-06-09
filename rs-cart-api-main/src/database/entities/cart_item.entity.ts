import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { CartEntity } from "./cart.entity";

@Entity({ name: 'cart_items' })
export class CartItem {
  @ManyToOne(() => CartEntity, cart => cart.id)
  @JoinColumn({ name: 'cart_id'})
  cart: CartEntity;

  @PrimaryColumn({ type: 'uuid', insert: false, select: false, update: false })
  id: never;

  @Column({ type: 'uuid', nullable: false })
  productId: string;

  @Column({ type: 'integer', nullable: false })
  count: number;
}