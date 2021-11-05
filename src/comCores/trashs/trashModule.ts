import { forwardRef, Module } from '@nestjs/common';
import { TrashService } from './trash.service';
import { TrashController } from './trashController';
import { MongooseModule } from '@nestjs/mongoose';
import { Depart, DepartSchema } from '../../cores/users/departs/depart.model';
import { User, UserSchema } from '../../cores/users/user.model';
import { Trash, TrashSchema } from './entities/trash.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports:[MongooseModule.forFeature([
    { name: Depart.name, schema: DepartSchema },
    { name: User.name, schema: UserSchema },
    { name: Trash.name, schema: TrashSchema },
  ]),
    forwardRef(() => AuthModule)
  ],
  controllers: [TrashController],
  providers: [TrashService],
  exports: [TrashService]
})
export class TrashModule {}
