import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards, UsePipes, Body, Controller, Param, Get, Patch, Post, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './user.model';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RoleAddDto } from './dto/role-add.dto';
import { DepartUpdateDto } from './dto/depart-update.dto';
import { Client } from '../clients/entities/client.entity';
import { AddPhoneDto } from '../clients/dto/add-phone.dto';

@ApiTags('Пользователи системы CRM')
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {
  }
  @ApiOperation({ description:'Точка доступа для получения списка всех пользователей, доступ ограничен, только для пользователей с ролью - ADMIN', summary: 'Получить список всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получить запись пользователя по его имени', description:'Точка доступа для получения записи пользователя по его имени , доступ ограничен, только для пользователей с ролью - ADMIN' })
  @ApiResponse({ status: 200, type: [User] })
  // @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get(':name')
  getByName(@Param('name') name: string) {
    return this.userService.getUserByName(name);
  }

  @ApiOperation({ summary: 'Получить запись пользователя по ID', description:'Точка доступа для получения записи пользователя по ID , доступ ограничен, только для пользователей с ролью - ADMIN' })
  @ApiResponse({ status: 200, type: [User] })
  //@UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('id/:id')
  async getByID(@Param('id') id: string) {
    if (id.length === 24){
      return await this.userService.getUserByID(id);
    }
    throw new HttpException({ message: 'Неверный ID' }, HttpStatus.NOT_FOUND);
  }


  @ApiOperation({ summary: 'Создание пользователя' ,description:'Точка доступа для создания пользователя, доступ неограничен' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() dto: UserCreateDto) {
    return await this.userService.createUser(dto);
  }

  @ApiOperation({ summary: 'Добавить новый номер телефона пользователя' ,description:'Точка доступа для добавления новых номеров телефона пользователя, доступ только для админов и отдела продаж' })
  @ApiResponse({ status: 200, type: Client })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'SELLER')
  @UseGuards(RolesGuard)
  @Post('/phone')
  addUserPhone(@Body() addPhone: AddPhoneDto): Promise<User> {
    return this.userService.addUserPhone(addPhone);
  }

  @ApiOperation({ summary: 'Добавить пользователю роль' })
  @ApiResponse({ status: 200 })
  // @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: RoleAddDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Изменить подразделение пользователя' })
  @ApiResponse({ status: 200 })
  // @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch('/dept')
  updateDept(@Body() dto: DepartUpdateDto) {
    if(dto.userID.length === 24) {
      return this.userService.updDept(dto);
    }
    throw new HttpException({ message: 'Неверный ID' }, HttpStatus.NOT_FOUND);
  }
}
