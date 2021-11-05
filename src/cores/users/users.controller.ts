import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UseGuards, UsePipes, Body, Controller, Param, Get, Patch, Post, ValidationPipe, Delete } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './user.model';
import { Roles } from '../../auth/role-auth.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { RoleAddDto } from './dto/role-add.dto';
import { DepartUpdateDto } from './dto/depart-update.dto';
import { RemoveDto } from '../../comCores/dto/remove.dto';

@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@Roles('ADMIN')
@UseGuards(RolesGuard)
@ApiTags('Пользователи системы CRM')
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {
  }

  @ApiOperation({ summary: 'Создание пользователя' ,description:'Точка доступа для создания пользователя, доступ неограничен' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async createUser(@Body() dto: UserCreateDto): Promise<User> {
    return await this.userService.createUser(dto);
  }

  @ApiOperation({ description:'Точка доступа для получения списка всех пользователей, доступ ограничен, только для пользователей с ролью - ADMIN', summary: 'Получить список всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получить запись пользователя по его имени', description:'Точка доступа для получения записи пользователя по его имени , доступ ограничен, только для пользователей с ролью - ADMIN' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('name/:name')
  getByName(@Param('name') name: string): Promise<User> {
    return this.userService.getUserByName(name);
  }

  @ApiOperation({ summary: 'Получить запись пользователя по ID', description:'Точка доступа для получения записи пользователя по ID , доступ ограничен, только для пользователей с ролью - ADMIN' })
  @ApiResponse({ status: 200, type: User })
  @Get('id/:id')
  getByID(@Param('id') id: User): Promise<User> {
      return this.userService.getUserByID(id);
  }

  @ApiOperation({ summary: 'Удаление пользователя' ,description:'Точка доступа для удаления пользователя, доступ для админов' })
  @ApiResponse({ status: 200, type: User })
  @Delete(':id')
  removeUser(@Param('id') id: User, @Body() dto: RemoveDto): Promise<User> {
    return this.userService.removeUser( id, dto );
  }

  @ApiOperation({ summary: 'Добавить пользователю роль' })
  @ApiResponse({ status: 200, type: User })
  @Post('/role')
  addRole(@Body() dto: RoleAddDto): Promise<User> {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Изменить подразделение пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Patch('/dept')
  updateDept(@Body() dto: DepartUpdateDto): Promise<User> {
    return this.userService.updUserDept(dto);
  }




}
