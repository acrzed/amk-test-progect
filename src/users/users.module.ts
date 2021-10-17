import { AuthModule } from '../auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { Role, RoleSchema } from '../roles/roles.model';
import { Depart, DepartSchema } from '../departs/depart.model';
import { RolesModule } from '../roles/roles.module';
import { DepartsModule } from '../departs/departs.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Depart.name, schema: DepartSchema },
      { name: Role.name, schema: RoleSchema }
    ]),
    RolesModule,
    DepartsModule,
    forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
