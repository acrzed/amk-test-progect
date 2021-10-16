import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { Role, RoleSchema } from '../roles/roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { DeptsModule } from '../depts/depts.module';
import { Dept, DeptSchema } from '../depts/dept.model';
import { DeptsService } from '../depts/depts.service';

@Module({
  imports:[MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Role.name, schema: RoleSchema },
    { name: Dept.name, schema: DeptSchema }
    ]),
    RolesModule,
    DeptsModule,
    DeptsService,
    forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
