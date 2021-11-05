import { Module } from '@nestjs/common';
import { OrderStatsService } from './order-stats.service';
import { OrderStatsController } from './order-stats.controller';

@Module({
  controllers: [OrderStatsController],
  providers: [OrderStatsService]
})
export class OrderStatsModule {}
