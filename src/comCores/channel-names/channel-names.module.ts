import { forwardRef, Module } from '@nestjs/common';
import { ChannelNamesService } from './channel-names.service';
import { ChannelNamesController } from './channel-names.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../cores/users/user.model';
import { ChannelName, ChannelNameSchema } from './entities/channel-name.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Trash, TrashSchema } from '../trashs/entities/trash.entity';

@Module({
  imports:[MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: ChannelName.name, schema: ChannelNameSchema },
    { name: Trash.name, schema: TrashSchema },
  ]),
    forwardRef(() => AuthModule),],
  controllers: [ChannelNamesController],
  providers: [ChannelNamesService],
  exports: [ChannelNamesService]
})
export class ChannelNamesModule {}
