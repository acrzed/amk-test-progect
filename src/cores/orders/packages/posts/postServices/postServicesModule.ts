import { forwardRef, Module } from '@nestjs/common';
import { postService } from './post-services.service';
import { postServicesController } from './postServicesController';
import { MongooseModule } from '@nestjs/mongoose';
import { Trash, TrashSchema } from '../../../../../comCores/trashs/entities/trash.entity';
import { AuthModule } from '../../../../../auth/auth.module';
import { PostService, PostServiceSchema } from './entities/postService.entity';
import { SupsModule } from '../../../../sups/sups.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostService.name, schema: PostServiceSchema },
      { name: Trash.name, schema: TrashSchema },
    ]),
    forwardRef(() => SupsModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [postServicesController],
  providers: [postService],
  exports: [postService]
})
export class PostServicesModule {}
