import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { v4 } from 'uuid';

import { Cart } from '../models';
import { CartEntity } from 'src/database/entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepo: Repository<CartEntity>
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    const cart: CartEntity = await this.cartRepo.findOne({ where: {
      userId: userId
    }, relations: ['items'], select: ['id']});

    return {
      id: cart.id,
      items: cart.items.map(item => ({ product: item.productId, count: item.count }))
    };
  }

  createByUserId(userId: string) {
    const id = v4(v4());
    const userCart = {
      id,
      items: [],
    };

    this.userCarts[ userId ] = userCart;

    return userCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [ ...items ],
    }

    this.userCarts[ userId ] = { ...updatedCart };

    return { ...updatedCart };
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
  }
  
}
