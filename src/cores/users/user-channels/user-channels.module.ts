import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../../../auth/auth.module';
import { UserChannelsService } from './user-channels.service';
import { UserChannelsController } from './user-channels.controller';
import { UserChannel, UserChannelSchema } from './entities/user-channel.entity';
import { User, UserSchema } from '../user.model';
import { Trash, TrashSchema } from '../../../comCores/trashs/entities/trash.entity';
import { ChannelNamesModule } from '../../../comCores/channel-names/channel-names.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserChannel.name, schema: UserChannelSchema },
      { name: Trash.name, schema: TrashSchema },
    ]),
    ChannelNamesModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [UserChannelsController],
  providers: [UserChannelsService],
  exports: [UserChannelsService]
})
export class UserChannelsModule {}
