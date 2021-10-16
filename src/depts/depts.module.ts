import { Module } from '@nestjs/common';
import { DeptsService } from './depts.service';
import { DeptsController } from './depts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dept, DeptSchema } from './dept.model';

@Module({
  imports:[MongooseModule.forFeature([
    {name: Dept.name, schema: DeptSchema}
  ])],
  controllers: [DeptsController],
  providers: [DeptsService]
})
export class DeptsModule {}
