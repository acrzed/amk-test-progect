import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserChannelsService } from './user-channels.service';
import { UpdateUserChannelDto } from './dto/update-user-channel.dto';
import { AddUserChannelDto } from './dto/add-user-channel.dto';
import { ObjectId } from 'mongoose';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/role-auth.decorator';
import { RemoveUserChannelDto } from './dto/remove-user-channel.dto';
import { Channel } from '../../clients/entities/channel.entity';
import { UserChannel } from './entities/user-channel.entity';

@ApiTags('Каналы пользователей')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Roles('ADMIN', 'SELLER')
@Controller('user/channels')
export class UserChannelsController {
  constructor(private readonly userChannelsService: UserChannelsService) {}

  @ApiOperation({ summary: 'Добавить новый канал пользователя' ,description:'Точка доступа для добавления новых каналов пользователя, доступ только для админов' })
  @ApiResponse({ status: 200, type: UserChannel })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  createChannel(@Body() createUserChannelDto: AddUserChannelDto): Promise<UserChannel> {
    return this.userChannelsService.addUserChannel(createUserChannelDto);
  }

  @ApiOperation({ summary: 'Все каналы пользователей' ,description:'Точка доступа для получения всех каналов пользователей, доступ только для админов' })
  @ApiResponse({ status: 200, type: [UserChannel] })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll(): Promise<UserChannel[]> {
    return this.userChannelsService.findAllChannels();
  }

  @ApiOperation({ summary: 'Канал пользователя по нику' ,description:'Точка доступа для получения канала пользователя по нику, доступ только для админов' })
  @ApiResponse({ status: 200, type: UserChannel })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('nick')
  findChannelByName(@Query('nick') nick: string){
    return this.userChannelsService.findChannelByNick(nick);
  }

  @ApiOperation({ summary: 'Канал пользователя по ID' ,description:'Точка доступа для получения канала пользователя по ID, доступ только для админов' })
  @ApiResponse({ status: 200, type: Channel })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('id/:id')
  findChannelByID(@Param('id') id: ObjectId) {
    return this.userChannelsService.findOneChannelByID(id);
  }

  @ApiOperation({ summary: 'Изменить канал пользователя' ,description:'Точка доступа для добавления новых данных канала пользователя, доступ только для админов' })
  @ApiResponse({ status: 200, type: Channel })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateUserChannelDto: UpdateUserChannelDto) {
    return this.userChannelsService.updateChannel(id, updateUserChannelDto);
  }

  @ApiOperation({ summary: 'Удалить канал пользователя' ,description:'Точка доступа для удаления канала пользователя, доступ только для админов' })
  @ApiResponse({ status: 200, type: Channel })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: ObjectId, @Body() dto: RemoveUserChannelDto): Promise<UserChannel> {
    return this.userChannelsService.removeChannel(id, dto);
  }
}
