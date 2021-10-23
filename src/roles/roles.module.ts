import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './roles.model';
import { User, UserSchema } from '../users/user.model';
import { AuthModule } from '../auth/auth.module';
import { Trash, TrashSchema } from '../trashs/entities/trash.entity';


@Module({
  imports:[MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Role.name, schema: RoleSchema },
    { name: Trash.name, schema: TrashSchema },
    ]),
    forwardRef(() => AuthModule),],
  providers: [RolesService],
  controllers: [RolesController],
  exports:[RolesService]
})
export class RolesModule {}
