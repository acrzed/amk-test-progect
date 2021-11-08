import { forwardRef, Module } from '@nestjs/common';
import { RecipientsService } from './recipients.service';
import { RecipientsController } from './recipients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../../users/user.model';
import { Trash, TrashSchema } from '../../../../../comCores/trashs/entities/trash.entity';
import { Client, ClientSchema } from '../../../../clients/entities/client.entity';
import { AuthModule } from '../../../../../auth/auth.module';
import { Recipient, RecipientSchema } from './entities/recipient.entity';
import { SupsModule } from '../../../../sups/sups.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Recipient.name, schema: RecipientSchema },
      { name: Trash.name, schema: TrashSchema },
      { name: Client.name, schema: ClientSchema }
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => SupsModule),
  ],
  controllers: [RecipientsController],
  providers: [RecipientsService],
  exports: [RecipientsService]
})
export class RecipientsModule {}
