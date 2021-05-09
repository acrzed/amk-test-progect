import { Module } from '@nestjs/common';
import { CategoryMaterialService } from './category-material.service';
import { CategoryMaterialController } from './category-material.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryMaterial, CategoryMaterialSchema } from './categoty-material.models';
import { User, UserSchema } from '../users/user.model';
import { Role, RoleSchema } from '../roles/roles.model';
import { UserRoles, UserRolesSchema } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name: CategoryMaterial.name, schema: CategoryMaterialSchema},
    { name: User.name, schema: UserSchema },
    { name: Role.name, schema: RoleSchema },
    { name: UserRoles.name, schema: UserRolesSchema }
  ]),
  RolesModule,
  AuthModule,],
  providers: [CategoryMaterialService],
  controllers: [CategoryMaterialController],
  exports: [CategoryMaterialService]
})
export class CategoryMaterialModule {}
