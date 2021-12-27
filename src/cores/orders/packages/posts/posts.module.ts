import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trash, TrashSchema } from '../../../../comCores/trashs/entities/trash.entity';
import { AuthModule } from '../../../../auth/auth.module';
import { PostSrv, PostSrvSchema } from './entities/postSrv.entity';
import { SupsModule } from '../../../sups/sups.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostSrv.name, schema: PostSrvSchema },
      { name: Trash.name, schema: TrashSchema },
    ]),
    forwardRef(() => SupsModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
