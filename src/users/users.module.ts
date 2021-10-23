import { AuthModule } from '../auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { Role, RoleSchema } from '../roles/roles.model';
import { Depart, DepartSchema } from './departs/depart.model';
import { RolesModule } from '../roles/roles.module';
import { DepartsModule } from './departs/departs.module';
import { UserPhonesModule } from './user-phones/user-phones.module';
import { UserChannelsModule } from './user-channels/user-channels.module';
import { UserPhone, UserPhoneSchema } from './user-phones/entities/user-phone.entity';
import { Trash, TrashSchema } from '../trashs/entities/trash.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Depart.name, schema: DepartSchema },
      { name: Trash.name, schema: TrashSchema },
      { name: UserPhone.name, schema: UserPhoneSchema },
      { name: Role.name, schema: RoleSchema }
    ]),
    forwardRef(() => AuthModule),
    RolesModule,
    DepartsModule,
    UserPhonesModule,
    UserChannelsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
