import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/user.model';
import { Role, RoleSchema } from '../roles/roles.model';
import { UserRoles, UserRolesSchema } from '../roles/user-roles.model';
import { CategoryMaterial, CategoryMaterialSchema } from '../category-material/categoty-material.models';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { Material, MaterialSchema } from './material.models';
import { CategoryMaterialModule } from '../category-material/category-material.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name: CategoryMaterial.name, schema: CategoryMaterialSchema},
    {name: Material.name, schema: MaterialSchema},
    { name: User.name, schema: UserSchema },
    { name: Role.name, schema: RoleSchema },
    { name: UserRoles.name, schema: UserRolesSchema }
  ]),
    RolesModule,
    AuthModule,
    CategoryMaterialModule],
  providers: [MaterialsService],
  controllers: [MaterialsController]
})
export class MaterialsModule {}
