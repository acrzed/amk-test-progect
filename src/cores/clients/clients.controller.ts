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
  UseGuards
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from './entities/client.entity';
import { Roles } from '../../auth/role-auth.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RemoveTrashDto } from '../../comCores/trashs/dto/remove-trash.dto';

@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@Roles('ADMIN', 'SELLER')
@UseGuards(RolesGuard)
@ApiTags('Клиенты (Покупатели))')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {
  }

  @ApiOperation({
    summary: '',
    description: 'Точка доступа для создания клиента, доступ только для админов и отдела продаж'
  })
  @ApiResponse({ status: 200, type: Client })
  @Post()
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }

  @ApiOperation({
    summary: '',
    description: 'Точка доступа для получения списка клиентов, доступ только для админов и отдела продаж'
  })
  @ApiResponse({ status: 200, type: [Client] })
  @Get()
  findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @ApiOperation({
    summary: 'ID клиента',
    description: 'Точка доступа для поиска клиента по ID, доступ только для админов и отдела продаж'
  })
  @ApiResponse({ status: 200, type: Client })
  @Get(':id')
  findOne(@Param('id') id: Client) {
    return this.clientsService.getClientByID(id);
  }

  @ApiOperation({
    summary: 'телефон',
    description: 'Точка доступа для поиска клиента по номеру телефона, доступ только для админов и отдела продаж'
  })
  @ApiResponse({ status: 200 })
  @Get('phone/:phone')
  findByPhone(@Param('phone') phone: any) {
    return this.clientsService.getClientByPhone(phone);
  }

  @ApiOperation({
    summary: 'ID клиента',
    description: 'Изменение данных клиента с ID № , доступ только для админов и отдела продаж'
  })
  @ApiResponse({ status: 200, type: Client })
  @Patch(':id')
  updateClient(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @ApiOperation({
    summary: 'Удаление клиента',
    description: 'Точка доступа для удаления клиента, доступ только для админов и отдела продаж'
  })
  @ApiResponse({ status: 200, type: Client })
  @Delete(':id')
  removeClient(@Param('id') id: Client, @Body() dto: RemoveTrashDto) {
    return this.clientsService.removeClient(id, dto);
  }

}
/*
  @ApiOperation({ summary: 'Добавить новый номер телефона клиента' ,description:'Точка доступа для добавления новых номеров телефона клиента, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Client })
  @Post('/phones')
  addClientPhone(@Body() addPhone: AddClientPhoneDto) {
    return this.clientsService.addClientPhone(addPhone);
  }

  @ApiOperation({ summary: 'Удалить номер телефона клиента' ,description:'Точка доступа для удаления номера телефона клиента, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Client })
  @Delete('/phones')
  removeClientPhone(@Body() removePhone: RemovePhoneDto) {
    return this.clientsService.removeClientPhone(removePhone);
  }

  @ApiOperation({ summary: 'Добавить новый канал клиента' ,description:'Точка доступа для добавления новых каналов коммуникации с клиентом, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Client })
  @Post('/channel')
  addClientChannel(@Body() addChannel: AddChannelDto) {
    return this.clientsService.addChannel(addChannel);
  }

  @ApiOperation({ summary: 'Удаление канала клиента' ,description:'Точка доступа для удаления клиента, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Client })
  @Delete('/channel/del')
  removeClientChannel(@Body() dto: RemoveChannelDto) {
    return this.clientsService.removeChannel(dto);
  }
*/
