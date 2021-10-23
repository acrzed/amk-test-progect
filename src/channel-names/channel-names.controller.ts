import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChannelNamesService } from './channel-names.service';
import { CreateChannelNameDto } from './dto/create-channel-name.dto';
import { UpdateChannelNameDto } from './dto/update-channel-name.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ChannelName } from './entities/channel-name.entity';
import { ObjectId } from 'mongoose';
import { RemoveChannelNameDto } from './dto/remove-channel-name.dto';

@Controller('channel-names')
export class ChannelNamesController {
  constructor(private readonly channelNamesService: ChannelNamesService) {}

  @ApiOperation({summary: 'Создание имени канала'})
  @ApiResponse({status:200, type: ChannelName})
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'SELLER')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createChannelNameDto: CreateChannelNameDto) {
    return this.channelNamesService.createName(createChannelNameDto);
  }

  @ApiOperation({summary: 'Все имена'})
  @ApiResponse({status:200, type: [ChannelName]})
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'SELLER')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.channelNamesService.findAllNames();
  }

  @ApiOperation({summary: 'значение по имени'})
  @ApiResponse({status:200, type: ChannelName})
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'SELLER')
  @UseGuards(RolesGuard)
  @Get(':value')
  getByValue(@Param('value') value: string){
    return this.channelNamesService.findOneName(value)
  }

  @ApiOperation({summary: 'Изменить имя'})
  @ApiResponse({status:200, type: ChannelName})
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'SELLER')
  @UseGuards(RolesGuard)
  @Patch()
  update(@Body() updateChannelNameDto: UpdateChannelNameDto) {
    return this.channelNamesService.updateName(updateChannelNameDto);
  }

  @ApiOperation({summary: 'Удалить имя'})
  @ApiResponse({status:200, type: ChannelName})
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: ObjectId, dto: RemoveChannelNameDto) {
    return this.channelNamesService.removeName(id, dto);
  }
}
