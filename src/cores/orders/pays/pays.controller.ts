import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { PaysService } from './pays.service';
import { CreatePayDto } from './dto/create-pay.dto';
import { UpdatePayDto } from './dto/update-pay.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { Roles } from '../../../auth/role-auth.decorator';
import { ClientChannel } from '../../clients/client-channels/entities/client-channel.entity';
import { Pay } from './entities/pay.entity';
import { RemoveTrashDto } from '../../../comCores/trashs/dto/remove-trash.dto';

@ApiTags('Оплаты клиентов')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Roles('ADMIN', 'SELLER')
@Controller('pays')
export class PaysController {
  constructor(private readonly paysService: PaysService) {}

  @ApiOperation({ summary: 'Добавить новую оплату клиента' ,description:'Точка доступа для добавления новых оплат клиента, доступ только для админов и продажников' })
  @ApiResponse({ status: 200, type: Pay})
  @Post()
  create(@Body() createPayDto: CreatePayDto): Promise<Pay> {
    return this.paysService.create(createPayDto);
  }

  @ApiOperation({ summary: 'Все оплаты клиента' ,description:'Все оплаты клиента, доступ только для админов и продажников' })
  @ApiResponse({ status: 200, type: [Pay]})
  @Get()
  findAll(): Promise<Pay[]> {
    return this.paysService.findAll();
  }

  @ApiOperation({ summary: 'Найти оплату клиента по ID' ,description:'Точка доступа для поиска оплат клиента по ID, доступ только для админов и продажников' })
  @ApiResponse({ status: 200, type: Pay})
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Pay> {
    return this.paysService.findByID(id);
  }

  @ApiOperation({ summary: 'Найти и изменить оплату клиента по ID' ,description:'Точка доступа для поиска и редактирования оплат клиента по ID, доступ только для админов и продажников' })
  @ApiResponse({ status: 200, type: Pay})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayDto: UpdatePayDto): Promise<Pay> {
    return this.paysService.update(id, updatePayDto);
  }

  @ApiOperation({ summary: 'Найти и удалить оплату клиента по ID' ,description:'Точка доступа для поиска и удаления оплат клиента по ID, доступ только для админов и продажников' })
  @ApiResponse({ status: 200, type: Pay})
  @Delete(':id')
  remove(@Param('id') id: string, @Body() dto: RemoveTrashDto): Promise<Pay> {
    return this.paysService.remove(id, dto);
  }
}
