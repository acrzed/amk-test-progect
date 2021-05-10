import { Module } from '@nestjs/common';
import { UslugyController } from './uslugy.controller';
import { UslugyService } from './uslugy.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryUslug, CategoryUslugSchema } from '../category-uslug/categoty-uslug.models';
import { Usluga, UslugySchema } from './usluga.models';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from '../users/user.model';
import { Role, RoleSchema } from '../roles/roles.model';
import { UserRoles, UserRolesSchema } from '../roles/user-roles.model';
import { CategoryUslugModule } from '../category-uslug/category-uslug.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name: CategoryUslug.name, schema: CategoryUslugSchema},
    {name: Usluga.name, schema: UslugySchema},
    { name: User.name, schema: UserSchema },
    { name: Role.name, schema: RoleSchema },
    { name: UserRoles.name, schema: UserRolesSchema }
  ]),
    RolesModule,
    AuthModule,
    CategoryUslugModule],
  controllers: [UslugyController],
  providers: [UslugyService]
})
export class UslugyModule {}
