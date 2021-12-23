import { forwardRef, Module } from '@nestjs/common';
import { OrderTypesService } from './order-types.service';
import { OrderTypesController } from './order-types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trash, TrashSchema } from '../../../comCores/trashs/entities/trash.entity';
import { SupsModule } from '../../sups/sups.module';
import { AuthModule } from '../../../auth/auth.module';
import { OrderType, OrderTypeSchema } from './entities/order-type.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderType.name, schema: OrderTypeSchema },
      { name: Trash.name, schema: TrashSchema },
    ]),
    forwardRef(() => SupsModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [OrderTypesController],
  providers: [OrderTypesService],
  exports: [OrderTypesService]
})
export class OrderTypesModule {}
