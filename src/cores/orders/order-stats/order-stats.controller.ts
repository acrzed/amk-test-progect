import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderStatsService } from './order-stats.service';
import { CreateOrderStatDto } from './dto/create-order-stat.dto';
import { UpdateOrderStatDto } from './dto/update-order-stat.dto';

@Controller('order-stats')
export class OrderStatsController {
  constructor(private readonly orderStatsService: OrderStatsService) {}

  @Post()
  create(@Body() createOrderStatDto: CreateOrderStatDto) {
    return this.orderStatsService.create(createOrderStatDto);
  }

  @Get()
  findAll() {
    return this.orderStatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderStatsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderStatDto: UpdateOrderStatDto) {
    return this.orderStatsService.update(+id, updateOrderStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderStatsService.remove(+id);
  }
}
