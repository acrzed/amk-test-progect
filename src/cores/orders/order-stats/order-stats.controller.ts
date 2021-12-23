import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { OrderStatsService } from './order-stats.service';
import { CreateOrderStatDto } from './dto/create-order-stat.dto';
import { UpdateOrderStatDto } from './dto/update-order-stat.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { Roles } from '../../../auth/role-auth.decorator';
import { RemoveTrashDto } from '../../../comCores/trashs/dto/remove-trash.dto';

@ApiTags('Статус заказа')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Roles('ADMIN', 'SELLER')
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
    return this.orderStatsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderStatDto: UpdateOrderStatDto) {
    return this.orderStatsService.update(id, updateOrderStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() dto: RemoveTrashDto) {
    return this.orderStatsService.remove(id, dto);
  }
}
