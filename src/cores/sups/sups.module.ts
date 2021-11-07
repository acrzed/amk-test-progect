import { forwardRef, Module } from '@nestjs/common';
import { SupsService } from './sups.service';
import { SupsController } from './sups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../orders/entities/order.entity';
import { User, UserSchema } from '../users/user.model';
import { Client, ClientSchema } from '../clients/entities/client.entity';
import { Trash, TrashSchema } from '../../comCores/trashs/entities/trash.entity';
import { UsersModule } from '../users/users.module';
import { OrderTypesModule } from '../orders/order-types/order-types.module';
import { OrderStatsModule } from '../orders/order-stats/order-stats.module';
import { AuthModule } from '../../auth/auth.module';
import { Role, RoleSchema } from '../../comCores/roles/roles.model';
import { Depart, DepartSchema } from '../users/departs/depart.model';
import { UserPhone, UserPhoneSchema } from '../users/user-phones/entities/user-phone.entity';
import { ChannelName, ChannelNameSchema } from '../../comCores/channel-names/entities/channel-name.entity';
import { UserChannel, UserChannelSchema } from '../users/user-channels/entities/user-channel.entity';
import { ClientPhone, ClientPhoneSchema } from '../clients/client-phones/entities/client-phone.entity';
import { ClientChannel, ClientChannelSchema } from '../clients/client-channels/entities/client-channel.entity';
import { Pay, PaySchema } from '../orders/pays/entities/pay.entity';
import { Dispatch, DispatchSchema } from '../orders/dispaches/entities/dispatch.entity';
import { Recipient, RecipientSchema } from '../orders/dispaches/packages/recipients/entities/recipient.entity';
import { ClientPhonesModule } from '../clients/client-phones/client-phones.module';
import { ClientChannelsModule } from '../clients/client-channels/client-channels.module';
import { OrdersModule } from '../orders/orders.module';
import { PaysModule } from '../orders/pays/pays.module';
import { DispatchsModule } from '../orders/dispaches/dispatchs.module';
import { RecipientsModule } from '../orders/dispaches/packages/recipients/recipients.module';
import { RolesModule } from '../../comCores/roles/roles.module';
import { DepartsModule } from '../users/departs/departs.module';
import { UserPhonesModule } from '../users/user-phones/user-phones.module';
import { UserChannelsModule } from '../users/user-channels/user-channels.module';
import { ChannelNamesModule } from '../../comCores/channel-names/channel-names.module';
import { ClientsModule } from '../clients/clients.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Depart.name, schema: DepartSchema },
      { name: UserPhone.name, schema: UserPhoneSchema },
      { name: ChannelName.name, schema: ChannelNameSchema },
      { name: UserChannel.name, schema: UserChannelSchema },
      { name: Client.name, schema: ClientSchema },
      { name: ClientPhone.name, schema: ClientPhoneSchema },
      { name: ClientChannel.name, schema: ClientChannelSchema },
      { name: Order.name, schema: OrderSchema },
      { name: Pay.name, schema: PaySchema },
      { name: Dispatch.name, schema: DispatchSchema },
      { name: Recipient.name, schema: RecipientSchema },
      { name: Trash.name, schema: TrashSchema }
    ]),
    forwardRef(() => UsersModule),
    // UsersModule,
    RolesModule,
    DepartsModule,
    UserPhonesModule,
    UserChannelsModule,
    ChannelNamesModule,
    ClientPhonesModule,
    ClientChannelsModule,
    DispatchsModule,
    RecipientsModule,
    forwardRef(() => OrdersModule),
    forwardRef(() => PaysModule),
    forwardRef(() => ClientsModule),
    forwardRef(() => AuthModule),

  ],
  controllers: [SupsController],
  providers: [SupsService],
  exports: [SupsService]
})
export class SupsModule {}
