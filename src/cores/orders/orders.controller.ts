import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/role-auth.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { Client } from '../clients/entities/client.entity';
import { AddOrderDto } from './dto/add-order.dto';
import { Order } from './entities/order.entity';
import { RemoveTrashDto } from '../../comCores/trashs/dto/remove-trash.dto';


@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@Roles('ADMIN', 'SELLER')
@UseGuards(RolesGuard)
@ApiTags('Управление заказами клиентов')
@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Добавить новый заказ клиента' ,description:'Точка доступа для добавления новых каналов коммуникации с клиентом, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Client })
  @Post()
  addClientOrder(@Body() addOrder: AddOrderDto) {
    return this.ordersService.addOrder(addOrder);
  }

  @ApiOperation({ summary: 'Удаление заказа клиента' ,description:'Точка доступа для удаления клиента, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Client })
  @Delete(':id')
  removeClientOrder(@Param('id') id: Order, @Body() dto: RemoveTrashDto) {
    return this.ordersService.removeOrder(id, dto);
  }
  // @ApiOperation({ summary: 'Создание заказа' ,description:'Точка доступа для создания заказа, доступ только для админов и отдела продаж' })
  // @ApiResponse({ status: 200, type: Order })
  // @UsePipes(ValidationPipe)
  // @UseGuards(JwtAuthGuard)
  // @Roles('ADMIN', 'SELLER')
  // @UseGuards(RolesGuard)
  // @Post()
  // createOrder(@Body() createOrderDto: CreateOrderDto) {
  //   return this.ordersService.createOrder(createOrderDto);
  // }

  @Get()
  findAllOrders() {
    return this.ordersService.findAllOrders();
  }

  @Get(':id')
  findOrderByID(@Param('id') id: string) {
    return this.ordersService.findOrderByID(+id);
  }

  @Patch(':id')
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(+id, updateOrderDto);
  }
}
