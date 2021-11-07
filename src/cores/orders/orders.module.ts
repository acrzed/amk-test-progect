import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../users/user.model';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

import { Client, ClientSchema } from '../clients/entities/client.entity';
import { ClientsModule } from '../clients/clients.module';
import { ClientsService } from '../clients/clients.service';

import { Order, OrderSchema } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

import { Trash, TrashSchema } from '../../comCores/trashs/entities/trash.entity';
import { OrderTypesModule } from './order-types/order-types.module';
import { OrderStatsModule } from './order-stats/order-stats.module';
import { SupsModule } from '../sups/sups.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: User.name, schema: UserSchema },
      { name: Client.name, schema: ClientSchema },
      { name: Trash.name, schema: TrashSchema },
    ]),
    // UsersModule,
    OrderTypesModule,
    OrderStatsModule,
    forwardRef(() =>  UsersModule),
    forwardRef(() => AuthModule),
    forwardRef(() => SupsModule),

  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
