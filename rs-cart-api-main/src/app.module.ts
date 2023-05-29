import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';

import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(),
    AuthModule,
    DatabaseModule,
    CartModule
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
