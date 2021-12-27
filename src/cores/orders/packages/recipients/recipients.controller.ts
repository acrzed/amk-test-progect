import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../auth/jwt-auth.guard';
import { Roles } from '../../../../auth/role-auth.decorator';
import { RolesGuard } from '../../../../auth/roles.guard';
import {
  UseGuards,
  UsePipes,
  Body,
  Controller,
  Param,
  Get,
  Patch,
  Post,
  ValidationPipe,
  Delete,
} from '@nestjs/common';

import { RecipientsService } from './recipients.service';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { Recipient } from './entities/recipient.entity';
import { RemoveTrashDto } from '../../../../comCores/trashs/dto/remove-trash.dto';

@ApiTags('Получатели отправлений')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@Roles('ADMIN', 'SELLER')
@UseGuards(RolesGuard)
@Controller('api/recipients')
export class RecipientsController {
  constructor(private readonly recipientsService: RecipientsService) {}

  @ApiOperation({ description:'Точка доступа для создания получателей, доступ только для админов и продажников', summary: 'Создание подразделения' })
  @ApiResponse({ status: 200, type: Recipient })
  @Post()
  create(@Body() createRecipientDto: CreateRecipientDto): Promise<Recipient> {
    return this.recipientsService.create(createRecipientDto);
  }

  @ApiOperation({ description:'Все получатели, доступ только для админов и продажников', summary: 'Создание подразделения' })
  @ApiResponse({ status: 200, type: [Recipient] })
  @Get()
  findAll(): Promise<Recipient[]>  {
    return this.recipientsService.findAll();
  }

  @ApiOperation({ description:'Получатель по ID, доступ только для админов и продажников', summary: 'Создание подразделения' })
  @ApiResponse({ status: 200, type: Recipient })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipientsService.findOne(id);
  }

  @ApiOperation({ description:'Получатель по номеру телефона, доступ только для админов и продажников', summary: 'Создание подразделения' })
  @ApiResponse({ status: 200, type: Recipient })
  @Get('phone/:num')
  findByPhone(@Param('num') num: number) {
    return this.recipientsService.findByPhone(num);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipientDto: UpdateRecipientDto) {
    return this.recipientsService.update(id, updateRecipientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() dto: RemoveTrashDto) {
    return this.recipientsService.remove(id, dto);
  }

}
