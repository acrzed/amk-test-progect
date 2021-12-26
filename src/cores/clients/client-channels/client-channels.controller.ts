import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, UseGuards, } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../auth/role-auth.decorator';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';

import { ClientChannel } from './entities/client-channel.entity';
import { ClientChannelsService } from './client-channels.service';
import { AddClientChannelDto } from './dto/add-client-channel.dto';
import { UpdateClientChannelDto } from './dto/update-client-channel.dto';
import { RemoveTrashDto } from '../../../comCores/trashs/dto/remove-trash.dto';


@ApiTags('Каналы клиентов')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Roles('ADMIN', 'SELLER')
@Controller('api/clients/channels')
export class ClientChannelsController {
  constructor(private readonly clientChannelsService: ClientChannelsService) {}


  @ApiOperation({ summary: 'Добавить новый канал клиента' ,description:'Точка доступа для добавления новых каналов клиента, доступ только для админов' })
  @ApiResponse({ status: 200, type: ClientChannel })
  @Post()
  createChannel(@Body() dto: AddClientChannelDto): Promise<ClientChannel> {
    return this.clientChannelsService.addClientChannel(dto);
  }

  @ApiOperation({ summary: 'Все каналы пользователей' ,description:'Точка доступа для получения всех каналов пользователей, доступ только для админов' })
  @ApiResponse({ status: 200, type: [ClientChannel] })
  @Get()
  findAll(): Promise<ClientChannel[]> {
    return this.clientChannelsService.findAllChannels();
  }

  @ApiOperation({ summary: 'Канал клиента по нику' ,description:'Точка доступа для получения канала клиента по нику, доступ только для админов' })
  @ApiResponse({ status: 200, type: ClientChannel })
  @Get('nick/:nick')
  findChannelByName(@Query('nick') nick: string): Promise<ClientChannel> {
    return this.clientChannelsService.findChannelByNick(nick);
  }

  @ApiOperation({ summary: 'Канал клиента по ID' ,description:'Точка доступа для получения канала клиента по ID, доступ только для админов' })
  @ApiResponse({ status: 200, type: ClientChannel })
  @Get(':id')
  findChannelByID(@Param('id') id: ClientChannel) : Promise<ClientChannel>{
    return this.clientChannelsService.findOneChannelByID(id);
  }

  @ApiOperation({ summary: 'Изменить канал клиента' ,description:'Точка доступа для добавления новых данных канала клиента, доступ только для админов' })
  @ApiResponse({ status: 200, type: ClientChannel })
  @Patch(':id')
  update(@Param('id') id: ClientChannel, @Body() dto: UpdateClientChannelDto): Promise<ClientChannel> {
    return this.clientChannelsService.updateChannel(id, dto);
  }

  @ApiOperation({ summary: 'Удалить канал клиента' ,description:'Точка доступа для удаления канала клиента, доступ только для админов' })
  @ApiResponse({ status: 200, type: ClientChannel })
  @Delete(':id')
  remove(@Param('id') id: ClientChannel, @Body() dto: RemoveTrashDto): Promise<ClientChannel> {
    return this.clientChannelsService.removeChannel(id, dto);
  }
}
