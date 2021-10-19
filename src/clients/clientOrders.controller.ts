import {
  Controller,
  Post,
  Body,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,

} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/role-auth.decorator';
import { Client } from './entities/client.entity';
import { ClientsOrderService } from './clientsOrder.service';

import { AddOrderDto } from './dto/add-order.dto';
import { RemoveOrderDto } from './dto/remove-order.dto';

@ApiTags('Управление заказами клиентов')
@Controller('clients/orders/')
export class ClientsOrdersController {
  constructor(private readonly clientsOrderService: ClientsOrderService) {}


  @ApiOperation({ summary: 'Добавить новый заказ клиента' ,description:'Точка доступа для добавления новых каналов коммуникации с клиентом, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Client })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'SELLER')
  @UseGuards(RolesGuard)
  @Post()
  addClientOrder(@Body() addOrder: AddOrderDto) {
    return this.clientsOrderService.addOrder(addOrder);
  }

  @ApiOperation({ summary: 'Удаление заказа клиента' ,description:'Точка доступа для удаления клиента, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Client })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'SELLER')
  @UseGuards(RolesGuard)
  @Delete()
  removeClientOrder(@Body() dto: RemoveOrderDto) {
    return this.clientsOrderService.removeOrder(dto);
  }


}
