import { forwardRef, Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './entities/client.entity';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from '../users/user.model';
import { Channel, ChannelSchema } from './entities/channel.entity';
import { Order, OrderSchema } from '../orders/entities/order.entity';
import { Trash, TrashSchema } from './entities/trash.entity';
import { ClientsOrdersController } from './clientOrders.controller';
import { ClientsOrderService } from './clientsOrder.service';
import { OrdersModule } from '../orders/orders.module';

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
    forwardRef(() => AuthModule)],
  controllers: [
    ClientsController,
    ClientsOrdersController],
  providers: [
    ClientsService,
    ClientsOrderService],
  exports: [ClientsService]
})
export class ClientsModule {}
