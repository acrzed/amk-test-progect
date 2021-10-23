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
import { UserPhonesService } from './user-phones.service';
import { UpdateUserPhoneDto } from './dto/update-user-phone.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/role-auth.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { AddUserPhoneDto } from './dto/add-user-phone.dto';
import { RemoveUserPhoneDto } from './dto/remove-user-phone.dto';
import { UserPhone } from './entities/user-phone.entity';
import { ObjectId } from 'mongoose';

@ApiTags('Телефоны пользователей')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Roles('ADMIN', 'SELLER')
@Controller('user/phones')
export class UserPhonesController {
  constructor(private readonly userPhonesService: UserPhonesService) {}

  @ApiOperation({ summary: 'Добавить новый телефон пользователя' ,description:'Точка доступа для добавления новых телефонов пользователя, доступ только для админов' })
  @ApiResponse({ status: 200, type: UserPhone })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  addUserPhone(@Body() addUserPhone: AddUserPhoneDto): Promise<UserPhone> {
    return this.userPhonesService.addUserPhone(addUserPhone);
  }

  @ApiOperation({ summary: 'Все телефоны пользователей' ,description:'Точка доступа для получения всех номеров телефонов пользователей, доступ только для админов' })
  @ApiResponse({ status: 200, type: UserPhone })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/all')
  findAllUserPhone() {
    return this.userPhonesService.findAllUserPhone();
  }

  @ApiOperation({ summary: 'Телефон пользователя по ID' ,description:'Точка доступа для получения телефона пользователя по ID, доступ только для админов' })
  @ApiResponse({ status: 200, type: UserPhone })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('id/:id')
  findUserPhoneById(@Param('id') id: ObjectId) {
    return this.userPhonesService.findUserPhoneById(id);
  }

  @ApiOperation({ summary: 'Телефон пользователя по номеру' ,description:'Точка доступа для получения телефона пользователей по номеру, доступ только для админов' })
  @ApiResponse({ status: 200, type: UserPhone })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('num/:number')
  findOneUserPhone(@Param('number') number: number) {
    return this.userPhonesService.findOneUserPhone(number);
  }

  @ApiOperation({ summary: 'Телефон пользователя по номеру' ,description:'Точка доступа для получения телефона пользователей по номеру, доступ только для админов' })
  @ApiResponse({ status: 200, type: UserPhone })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('search/')
  findUserPhone(@Query('any') any: any) {
    return this.userPhonesService.findUserPhone(any);
  }

  @ApiOperation({ summary: 'Обновить телефон пользователя' ,description:'Точка доступа для добавления новых данных телефона пользователя, доступ только для админов' })
  @ApiResponse({ status: 200, type: UserPhone })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch()
  updateUserPhone(@Body() updateUserPhoneDto: UpdateUserPhoneDto) {
    return this.userPhonesService.updateUserPhone(updateUserPhoneDto);
  }

  @ApiOperation({ summary: 'Удалить телефон пользователя' ,description:'Точка доступа для удаления телефона пользователя, доступ только для админов' })
  @ApiResponse({ status: 200, type: UserPhone })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete()
  removeUserPhone(@Body() dto: RemoveUserPhoneDto) {
    return this.userPhonesService.removeUserPhone(dto);
  }
}
