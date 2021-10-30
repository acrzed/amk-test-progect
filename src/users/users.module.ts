import { AuthModule } from '../auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './user.model';
import { Role, RoleSchema } from '../roles/roles.model';
import { Depart, DepartSchema } from './departs/depart.model';
import { UserPhone, UserPhoneSchema } from './user-phones/entities/user-phone.entity';
import { ChannelName, ChannelNameSchema } from '../channel-names/entities/channel-name.entity';
import { UserChannel, UserChannelSchema } from './user-channels/entities/user-channel.entity';
import { Trash, TrashSchema } from '../trashs/entities/trash.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesModule } from '../roles/roles.module';
import { DepartsModule } from './departs/departs.module';
import { UserPhonesModule } from './user-phones/user-phones.module';
import { UserChannelsModule } from './user-channels/user-channels.module';
import { ChannelNamesModule } from '../channel-names/channel-names.module';




@Module({
  imports:[
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Depart.name, schema: DepartSchema },
      { name: UserPhone.name, schema: UserPhoneSchema },
      { name: ChannelName.name, schema: ChannelNameSchema },
      { name: UserChannel.name, schema: UserChannelSchema },
      { name: Trash.name, schema: TrashSchema }
    ]),
    forwardRef(() => AuthModule),
    RolesModule,
    DepartsModule,
    UserPhonesModule,
    UserChannelsModule,
    ChannelNamesModule ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
