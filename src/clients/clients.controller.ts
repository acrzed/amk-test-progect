import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  HttpException, HttpStatus,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from './entities/client.entity';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddPhoneDto } from './dto/add-phone.dto';
import { RemovePhoneDto } from './dto/remove-phone.dto';
import { AddChannelDto } from './dto/add-channel.dto';
import { AddOrderDto } from './dto/add-order.dto';
import { RemoveOrderDto } from './dto/remove-order.dto';
import { RemoveChannelDto } from './dto/remove-channel.dto';

@ApiTags('Клиенты (Покупатели))')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Создание клиента' ,description:'Точка доступа для создания клиента, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Client })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'SELLER')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @ApiOperation({ summary: 'Все клиенты' ,description:'Точка доступа для получения списка клиентов, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: [Client] })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'SELLER')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @ApiOperation({ summary: 'Найти клиента по ID' ,description:'Точка доступа для поиска клиента по ID, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Client })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'SELLER')
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if(id.length === 24){
      return this.clientsService.findOne(id);
    }
    throw new HttpException({ message: 'Неверный ID' }, HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  updateClient(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @ApiOperation({ summary: 'Удаление клиента' ,description:'Точка доступа для удаления клиента, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Client })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'SELLER')
  @UseGuards(RolesGuard)
  @Delete('del/:id')
  removeClient(@Param('id') id: string) {
    return this.clientsService.removeClient(id);
  }

  @ApiOperation({ summary: 'Добавить новый номер телефона клиента' ,description:'Точка доступа для добавления новых номеров телефона клиента, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Client })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'SELLER')
  @UseGuards(RolesGuard)
  @Post('/phone')
  addClientPhone(@Body() addPhone: AddPhoneDto) {
    return this.clientsService.addClientPhone(addPhone);
  }

  @ApiOperation({ summary: 'Удалить номер телефона клиента' ,description:'Точка доступа для удаления номера телефона клиента, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Client })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'SELLER')
  @UseGuards(RolesGuard)
  @Delete('/phone')
  removeClientPhone(@Body() removePhone: RemovePhoneDto) {
    return this.clientsService.removeClientPhone(removePhone);
  }

  @ApiOperation({ summary: 'Добавить новый канал клиента' ,description:'Точка доступа для добавления новых каналов коммуникации с клиентом, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Client })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'SELLER')
  @UseGuards(RolesGuard)
  @Post('/channel')
  addClientChannel(@Body() addChannel: AddChannelDto) {
    return this.clientsService.addChannel(addChannel);
  }

  @ApiOperation({ summary: 'Удаление канала клиента' ,description:'Точка доступа для удаления клиента, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Client })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'SELLER')
  @UseGuards(RolesGuard)
  @Delete('/channel/del')
  removeClientChannel(@Body() dto: RemoveChannelDto) {
    return this.clientsService.removeChannel(dto);
  }



}
