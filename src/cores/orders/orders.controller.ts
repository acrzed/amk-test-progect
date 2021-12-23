import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/role-auth.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { CreateOrderDto } from './dto/create-order.dto';
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
  @ApiResponse({ status: 200, type: Order })
  @Post()
  addClientOrder(@Body() addOrder: CreateOrderDto) {
    return this.ordersService.addOrder(addOrder);
  }

  @ApiOperation({ summary: 'Удаление заказа клиента' ,description:'Точка доступа для удаления клиента, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Order })
  @Delete(':id')
  removeClientOrder(@Param('id') id: string, @Body() dto: RemoveTrashDto) {
    return this.ordersService.removeOrder(id, dto);
  }

  @Get()
  findAllOrders(): Promise<Order[]> {
    return this.ordersService.findAllOrders();
  }

  @Get(':id')
  findOrderByID(@Param('id') id: Order): Promise<Order> {
    return this.ordersService.findOrderByID(id);
  }

  @Patch(':id')
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(+id, updateOrderDto);
  }
}
