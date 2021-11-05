import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderTypesService } from './order-types.service';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { UpdateOrderTypeDto } from './dto/update-order-type.dto';

@Controller('order-types')
export class OrderTypesController {
  constructor(private readonly orderTypesService: OrderTypesService) {}

  @Post()
  create(@Body() createOrderTypeDto: CreateOrderTypeDto) {
    return this.orderTypesService.create(createOrderTypeDto);
  }

  @Get()
  findAll() {
    return this.orderTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderTypeDto: UpdateOrderTypeDto) {
    return this.orderTypesService.update(+id, updateOrderTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderTypesService.remove(+id);
  }
}
