import { Module } from '@nestjs/common';
import { TrashsService } from './trashs.service';
import { TrashsController } from './trashs.controller';

@Module({
  controllers: [TrashsController],
  providers: [TrashsService]
})
export class TrashsModule {}
