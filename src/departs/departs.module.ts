import { forwardRef, Module } from '@nestjs/common';
import { DepartsService } from './departs.service';
import { DepartsController } from './departs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Depart, DepartSchema } from './depart.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from '../users/user.model';

@Module({
  imports:[MongooseModule.forFeature([
    { name: Depart.name, schema: DepartSchema },
    { name: User.name, schema: UserSchema },
  ]),
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [DepartsController],
  providers: [DepartsService],
  exports: [DepartsService]
})
export class DepartsModule {}
