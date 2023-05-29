import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from "./entities/cart_item.entity";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CartEntity } from "./entities/cart.entity";

@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [CartEntity, CartItem],
       //  synchronize: true,
        /**
         * Flag to show all generated sql queries on each interaction with DB.
         * Should be omitted for production production.
         */
        logging: true,
        /**
         * This naming strategy will map field_name from database to fieldName inside application.
         */
        namingStrategy: new SnakeNamingStrategy(),
      }),
      TypeOrmModule.forFeature([CartEntity, CartItem]),
    ],
    exports: [TypeOrmModule],
  })
  export class DatabaseModule {
    constructor() {
        console.log(process.env.DATABASE_HOST);
        console.log('PORT:', +process.env.DATABASE_PORT);
        console.log('U:', process.env.DATABASE_USERNAME);
        console.log('P:', process.env.DATABASE_PASSWORD);
        console.log('DN:', process.env.DATABASE_NAME);
    }
  }