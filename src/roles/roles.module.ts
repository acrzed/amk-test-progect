import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './roles.model';
import { User, UserSchema } from '../users/user.model';


@Module({
  imports:[MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Role.name, schema: RoleSchema }
    ])],
  providers: [RolesService],
  controllers: [RolesController],
  exports:[RolesService]
})
export class RolesModule {}
