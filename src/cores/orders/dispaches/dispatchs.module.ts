import { Module } from '@nestjs/common';
import { DispatchsService } from './dispatchs.service';
import { DispatchsController } from './dispatchs.controller';
import { PostsModule } from './packages/posts/posts.module';
import { CitiesModule } from './packages/cities/cities.module';
import { PackagesModule } from './packages/packages.module';
import { PostServicesModule } from './packages/posts/postServices/postServicesModule';

@Module({
  imports: [PostsModule, CitiesModule, PostServicesModule, PackagesModule],
  controllers: [DispatchsController],
  providers: [DispatchsService],
  exports: [DispatchsService]

})
export class DispatchsModule {}
