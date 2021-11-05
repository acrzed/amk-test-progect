import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../../auth/auth.module';

import { User, UserSchema } from '../users/user.model';
import { Client, ClientSchema } from './entities/client.entity';
import { Order, OrderSchema } from '../orders/entities/order.entity';
import { Trash, TrashSchema } from '../../comCores/trashs/entities/trash.entity';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { OrdersModule } from '../orders/orders.module';
import { ClientChannel, ClientChannelSchema } from './client-channels/entities/client-channel.entity';
import { PaysModule } from '../orders/pays/pays.module';
import { DispatchsModule } from '../orders/dispaches/dispatchs.module';
import { RecipientsModule } from '../orders/dispaches/packages/recipients/recipients.module';
import { ClientPhone, ClientPhoneSchema } from './client-phones/entities/client-phone.entity';
import { Dispatch, DispatchSchema } from '../orders/dispaches/entities/dispatch.entity';
import { Pay, PaySchema } from '../orders/pays/entities/pay.entity';
import { Recipient, RecipientSchema } from '../orders/dispaches/packages/recipients/entities/recipient.entity';
import { ClientPhonesModule } from './client-phones/client-phones.module';
import { ClientChannelsModule } from './client-channels/client-channels.module';
import { UsersModule } from '../users/users.module';
import { PaysService } from '../orders/pays/pays.service';
import { UsersService } from '../users/users.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Client.name, schema: ClientSchema },
      { name: ClientPhone.name, schema: ClientPhoneSchema },
      { name: ClientChannel.name, schema: ClientChannelSchema },
      { name: Order.name, schema: OrderSchema },
      { name: Pay.name, schema: PaySchema },
      { name: Dispatch.name, schema: DispatchSchema },
      { name: Recipient.name, schema: RecipientSchema },
      { name: Trash.name, schema: TrashSchema }
      ]),
    forwardRef(() => AuthModule),
    UsersModule,
    ClientPhonesModule,
    ClientChannelsModule,
    OrdersModule,
    PaysModule,
    DispatchsModule,
    RecipientsModule
  ],
  controllers: [ClientsController],
  providers: [ClientsService, PaysService, UsersService],
  exports: [ClientsService]
})
export class ClientsModule {}
