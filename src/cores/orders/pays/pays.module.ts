import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../../../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../../users/user.model';
import { UsersModule } from '../../users/users.module';
import { UsersService } from '../../users/users.service';

import { Client, ClientSchema } from '../../clients/entities/client.entity';
import { ClientsModule } from '../../clients/clients.module';
import { ClientsService } from '../../clients/clients.service';

import { Pay, PaySchema } from './entities/pay.entity';
import { PaysService } from './pays.service';
import { PaysController } from './pays.controller';

import { Trash, TrashSchema } from '../../../comCores/trashs/entities/trash.entity';




@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
      { name: User.name, schema: UserSchema },
      { name: Trash.name, schema: TrashSchema },
      { name: Pay.name, schema: PaySchema },

    ]),
    UsersModule,
    forwardRef(() => AuthModule),
    forwardRef(() => ClientsModule),
  ],
  controllers: [PaysController],
  providers: [PaysService, UsersService, ClientsService],
  exports:[PaysService]
})
export class PaysModule {}
