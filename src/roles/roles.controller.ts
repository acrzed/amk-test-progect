import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ObjectId } from 'mongoose';
import { RemoveRoleDto } from './dto/remove-role.dto';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({summary: 'Создание роли пользователя'})
  @ApiResponse({status:200, type: Role})
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto:CreateRoleDto){
    return this.roleService.createRole(dto)
  }

  @ApiOperation({summary: 'Все созданные роли'})
  @ApiResponse({status:200, type: [Role]})
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAllRoles(): Promise<Role[]> {
    return this.roleService.findAllRoles()
  }

  @ApiOperation({ summary: 'Обновить роль' ,description:'Точка доступа для изменения роли пользователя, доступ только для админов' })
  @ApiResponse({ status: 200, type: Role })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch()
  updateUserPhone(@Body() dto: UpdateRoleDto) {
    return this.roleService.updateRole(dto);
  }

@ApiOperation({ summary: 'Удалить роль пользователя' ,description:'Точка доступа для удаления роли пользователя, доступ только для админов' })
@ApiResponse({ status: 200, type: Role })
@UseGuards(JwtAuthGuard)
@Roles('ADMIN')
@UseGuards(RolesGuard)
@Delete(':id')
  removeRole(@Param('id') id: ObjectId, @Body() dto: RemoveRoleDto) {
    return this.roleService.removeRole(id, dto);
  }

  @ApiOperation({summary: 'Получение роли пользователя по значению'})
  @ApiResponse({status:200, type: [Role]})
  @Get('/:value')
  getByValue(@Param('value') value: string){
    return this.roleService.getRoleByValue(value)
  }

}
