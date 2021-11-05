import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../../../auth/auth.module';

import { User, UserSchema } from '../../users/user.model';
import { Client, ClientSchema } from '../entities/client.entity';
import { ClientChannel, ClientChannelSchema } from './entities/client-channel.entity';
import { Trash, TrashSchema } from '../../../comCores/trashs/entities/trash.entity';

import { ClientChannelsService } from './client-channels.service';
import { ClientChannelsController } from './client-channels.controller';
import { ChannelNamesModule } from '../../../comCores/channel-names/channel-names.module';
import { UsersService } from '../../users/users.service';
import { ClientsService } from '../clients.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
      { name: User.name, schema: UserSchema },
      { name: ClientChannel.name, schema: ClientChannelSchema },
      { name: Trash.name, schema: TrashSchema },
    ]),
    ChannelNamesModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [ClientChannelsController],
  providers: [ClientChannelsService, UsersService, ClientsService],
  exports: [ClientChannelsService]
})
export class ClientChannelsModule {}
