import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';

@ApiTags('Пользователи системы CRM')
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {
  }
  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({status:200, type: User})
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto)
  }

  @ApiOperation({summary: 'Все пользователи'})
  @ApiResponse({status:200, type: [User]})
  // @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAll(){
    return this.userService.getAllUsers()
  }

  @ApiOperation({summary: 'Назначить роль'})
  @ApiResponse({status:200})
  // @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto){
    return this.userService.addRole(dto)
  }
}
