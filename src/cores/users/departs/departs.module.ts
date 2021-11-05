import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../../../auth/auth.module';
import { DepartsService } from './departs.service';
import { DepartsController } from './departs.controller';
import { Depart, DepartSchema } from './depart.model';
import { RolesModule } from '../../../comCores/roles/roles.module';
import { User, UserSchema } from '../user.model';
import { Trash, TrashSchema } from '../../../comCores/trashs/entities/trash.entity';


@Module({
  imports:[MongooseModule.forFeature([
    { name: Depart.name, schema: DepartSchema },
    { name: User.name, schema: UserSchema },
    { name: Trash.name, schema: TrashSchema },
  ]),
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [DepartsController],
  providers: [DepartsService],
  exports: [DepartsService]
})
export class DepartsModule {}
