import { Module } from '@nestjs/common';
import { CategoryUslugService } from './category-uslug.service';
import { CategoryUslugController } from './category-uslug.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryUslug, CategoryUslugSchema } from './categoty-uslug.models';
import { User, UserSchema } from '../users/user.model';
import { Role, RoleSchema } from '../roles/roles.model';
import { UserRoles, UserRolesSchema } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name: CategoryUslug.name, schema: CategoryUslugSchema},
    { name: User.name, schema: UserSchema },
    { name: Role.name, schema: RoleSchema },
    { name: UserRoles.name, schema: UserRolesSchema }
  ]),
    RolesModule,
    AuthModule],
  providers: [CategoryUslugService],
  controllers: [CategoryUslugController],
  exports:[CategoryUslugService]
})
export class CategoryUslugModule {}
