import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../../auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { UserPhonesService } from './user-phones.service';
import { UserPhonesController } from './user-phones.controller';
import { User, UserSchema } from '../user.model';
import { UserPhone, UserPhoneSchema } from './entities/user-phone.entity';
import { Trash, TrashSchema } from '../../trashs/entities/trash.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserPhone.name, schema: UserPhoneSchema },
      { name: Trash.name, schema: TrashSchema },
    ]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UserPhonesController],
  providers: [UserPhonesService],
  exports: [UserPhonesService]
})
export class UserPhonesModule {}
