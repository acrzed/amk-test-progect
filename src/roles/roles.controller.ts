import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({summary: 'Создание роли пользователя'})
  @ApiResponse({status:200, type: Role})
  @Post()
  create(@Body() dto:CreateRoleDto){
    return this.roleService.createRole(dto)
  }

  @ApiOperation({summary: 'Получение роли пользователя'})
  @ApiResponse({status:200, type: [Role]})
  @Get('/:value')
  async getByValue(@Param('value') value: string){
    return await this.roleService.getRoleByValue(value)
  }

}
