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
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { Roles } from '../../../auth/role-auth.decorator';
import { RolesGuard } from '../../../auth/roles.guard';

import { ClientPhone } from './entities/client-phone.entity';
import { ClientPhonesService } from './client-phones.service';
import { UpdateClientPhoneDto } from './dto/update-client-phone.dto';
import { AddClientPhoneDto } from './dto/add-client-phone.dto';
import { RemoveTrashDto } from '../../../comCores/trashs/dto/remove-trash.dto';



@ApiTags('Телефоны клиентов')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Roles('ADMIN', 'SELLER')
@Controller('clients/phones')
export class ClientPhonesController {
  constructor(private readonly clientPhonesService: ClientPhonesService) {}

  @ApiOperation({ summary: 'Добавить новый телефон клиента' ,description:'Точка доступа для добавления новых телефонов клиента, доступ только для админов' })
  @ApiResponse({ status: 200, type: ClientPhone })
  @Post()
  addClientPhone(@Body() addUserPhone: AddClientPhoneDto): Promise<ClientPhone> {
    return this.clientPhonesService.addClientPhone(addUserPhone);
  }

  @ApiOperation({ summary: 'Все телефоны пользователей' ,description:'Точка доступа для получения всех номеров телефонов пользователей, доступ только для админов' })
  @ApiResponse({ status: 200, type: [ClientPhone] })
  @Get('/all')
  findAllClientPhone(): Promise<ClientPhone[]> {
    return this.clientPhonesService.findAllClientPhone();
  }

  @ApiOperation({ summary: 'Телефон клиента по ID' ,description:'Точка доступа для получения телефона клиента по ID, доступ только для админов' })
  @ApiResponse({ status: 200, type: ClientPhone })
  @Get('id/:id')
  findClientPhoneById(@Param('id') id: ClientPhone): Promise<ClientPhone> {
    return this.clientPhonesService.findClientPhoneById(id);
  }

  @ApiOperation({ summary: 'Телефон клиента по номеру' ,description:'Точка доступа для получения телефона пользователей по номеру, доступ только для админов' })
  @ApiResponse({ status: 200, type: ClientPhone })
  @Get('num/:phone')
  findOneClientPhone(@Param('phone') phone: any): Promise<ClientPhone> {
    return this.clientPhonesService.findClientPhone(phone);
  }

  @ApiOperation({ summary: 'Телефон клиента по номеру', description:'Точка доступа для получения телефона пользователей по номеру, доступ только для админов' })
  @ApiResponse({ status: 200, type: ClientPhone })
  @Get('search/')
  findClientPhoneByAny(@Query('any') any: any): Promise<ClientPhone> {
    return this.clientPhonesService.findByAnyPhone(any);
  }

  @ApiOperation({ summary: 'Обновить телефон клиента' ,description:'Точка доступа для добавления новых данных телефона клиента, доступ только для админов' })
  @ApiResponse({ status: 200, type: ClientPhone })
  @Patch(':id')
  updateUserPhone(@Param('id') id: ClientPhone, @Body() dto: UpdateClientPhoneDto): Promise<ClientPhone> {
    return this.clientPhonesService.updateClientPhone(id, dto);
  }

  @ApiOperation({ summary: 'Удалить телефон клиента' ,description:'Точка доступа для удаления телефона клиента, доступ только для админов' })
  @ApiResponse({ status: 200, type: ClientPhone })

  @Delete(':id')
  removeUserPhone(@Param('id') id: ClientPhone, @Body() dto: RemoveTrashDto): Promise<ClientPhone> {
    return this.clientPhonesService.removeClientPhone(id, dto);
  }
}
