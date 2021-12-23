import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { OrderTypesService } from './order-types.service';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { UpdateOrderTypeDto } from './dto/update-order-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { Roles } from '../../../auth/role-auth.decorator';
import { RemoveTrashDto } from '../../../comCores/trashs/dto/remove-trash.dto';

@ApiTags('Тип заказа')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Roles('ADMIN', 'SELLER')
@Controller('order-types')
export class OrderTypesController {
  constructor(private readonly orderTypesService: OrderTypesService) {}

  @Post()
  create(@Body() dto: CreateOrderTypeDto) {
    return this.orderTypesService.create(dto);
  }

  @Get()
  findAll() {
    return this.orderTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderTypesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderTypeDto: UpdateOrderTypeDto) {
    return this.orderTypesService.update(id, updateOrderTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() dto: RemoveTrashDto) {
    return this.orderTypesService.remove(id, dto);
  }
}
