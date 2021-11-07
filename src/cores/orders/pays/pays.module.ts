import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../../../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../../users/user.model';
import { UsersService } from '../../users/users.service';

import { Client, ClientSchema } from '../../clients/entities/client.entity';
import { ClientsService } from '../../clients/clients.service';

import { Pay, PaySchema } from './entities/pay.entity';
import { PaysService } from './pays.service';
import { PaysController } from './pays.controller';

import { Trash, TrashSchema } from '../../../comCores/trashs/entities/trash.entity';
import { UsersModule } from '../../users/users.module';
import { OrdersModule } from '../orders.module';
import { SupsModule } from '../../sups/sups.module';
import { SupsService } from '../../sups/sups.service';






@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
      { name: User.name, schema: UserSchema },
      { name: Trash.name, schema: TrashSchema },
      { name: Pay.name, schema: PaySchema }
    ]),
    forwardRef(() => SupsModule),
    forwardRef(() => AuthModule),

  ],
  controllers: [PaysController],
  providers: [PaysService],
  exports:[PaysService]
})
export class PaysModule {}
