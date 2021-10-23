import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from '../users/user.model';
import { Client, ClientSchema } from './entities/client.entity';
import { Channel, ChannelSchema } from './entities/channel.entity';
import { Order, OrderSchema } from './orders/entities/order.entity';
import { Trash, TrashSchema } from '../trashs/entities/trash.entity';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { OrdersModule } from './orders/orders.module';
import { UnitsModule } from './units/units.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Channel.name, schema: ChannelSchema },
      { name: Order.name, schema: OrderSchema },
      { name: Trash.name, schema: TrashSchema },
      { name: Client.name, schema: ClientSchema }
      ]),
    OrdersModule,
    forwardRef(() => AuthModule),
    UnitsModule],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService]
})
export class ClientsModule {}
