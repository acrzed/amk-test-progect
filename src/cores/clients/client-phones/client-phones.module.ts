import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../../../auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { ClientPhonesService } from './client-phones.service';
import { ClientPhonesController } from './client-phones.controller';
import { ClientPhone, ClientPhoneSchema } from './entities/client-phone.entity';
import { Trash, TrashSchema } from '../../../comCores/trashs/entities/trash.entity';
import { Client, ClientSchema } from '../entities/client.entity';
import { User, UserSchema } from '../../users/user.model';
import { UsersService } from '../../users/users.service';
import { ClientsService } from '../clients.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
      { name: User.name, schema: UserSchema },
      { name: ClientPhone.name, schema: ClientPhoneSchema },
      { name: Trash.name, schema: TrashSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ClientPhonesController],
  providers: [ClientPhonesService],
  exports: [ClientPhonesService]
})
export class ClientPhonesModule {}
