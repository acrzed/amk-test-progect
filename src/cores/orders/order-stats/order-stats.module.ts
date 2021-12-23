import { forwardRef, Module } from '@nestjs/common';
import { OrderStatsService } from './order-stats.service';
import { OrderStatsController } from './order-stats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trash, TrashSchema } from '../../../comCores/trashs/entities/trash.entity';
import { SupsModule } from '../../sups/sups.module';
import { AuthModule } from '../../../auth/auth.module';
import { OrderStat, OrderStatSchema } from './entities/order-stat.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderStat.name, schema: OrderStatSchema },
      { name: Trash.name, schema: TrashSchema },
    ]),
    forwardRef(() => SupsModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [OrderStatsController],
  providers: [OrderStatsService],
  exports: [OrderStatsService]
})
export class OrderStatsModule {}
