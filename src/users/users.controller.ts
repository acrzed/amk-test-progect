import { Body, Controller, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdDeptDto } from './dto/update-dept.dto';

import { ObjectId } from 'mongoose';


@ApiTags('Пользователи системы CRM')
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {
  }
  @ApiOperation({ description:'Точка доступа для получения списка всех пользователей, доступ ограничен, только для пользователей с ролью - ADMIN', summary: 'Получить список всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  // @UseGuards(JwtAuthGuard)
  //@Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ description:'Точка доступа для получения записи пользователя по его имени , доступ ограничен, только для пользователей с ролью - ADMIN', summary: 'Получить запись пользователя по его имени' })
  @ApiResponse({ status: 200, type: [User] })
  // @UseGuards(JwtAuthGuard)
  //@Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get(':name')
  getByName(@Param('name') name: string) {
    return this.userService.getUserByName(name);
  }

  @Get('id/:id')
  getByID(@Param('id') id: ObjectId) {
    return this.userService.getUserByID(id);
  }


  @ApiOperation({ description:'Точка доступа для создания пользователя, доступ неограничен', summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @ApiOperation({ summary: 'Добавить роль' })
  @ApiResponse({ status: 200 })
  // @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Изменить подразделение' })
  @ApiResponse({ status: 200 })
  // @UseGuards(JwtAuthGuard)
  //@Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch('/dept')
  updateDept(@Body() dto: UpdDeptDto) {
    return this.userService.updDept(dto);
  }
}
