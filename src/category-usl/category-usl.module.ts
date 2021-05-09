import { Module } from '@nestjs/common';
import { CategoryUslService } from './category-usl.service';
import { CategoryUslController } from './category-usl.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CatUsl, CatUslSchema } from './categoty-usl.models';
import { User, UserSchema } from '../users/user.model';
import { Role, RoleSchema } from '../roles/roles.model';
import { UserRoles, UserRolesSchema } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name: CatUsl.name, schema: CatUslSchema},
    { name: User.name, schema: UserSchema },
    { name: Role.name, schema: RoleSchema },
    { name: UserRoles.name, schema: UserRolesSchema }
  ]),
    RolesModule,
    AuthModule],
  providers: [CategoryUslService],
  controllers: [CategoryUslController]
})
export class CategoryUslModule {}
