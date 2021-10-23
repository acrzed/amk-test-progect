import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { DepartsService } from './departs.service';
import { CreateDepartDto } from './dto/create-depart.dto';
import { UpdateDepartDto } from './dto/update-depart.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Depart } from './depart.model';
import { Roles } from '../../auth/role-auth.decorator';
import { RolesGuard } from '../../auth/roles.guard';

@ApiTags('Подразделения / отделы')
@Controller('dept')
export class DepartsController {
  constructor(private readonly departsService: DepartsService) {}

  @ApiOperation({ description:'Точка доступа для создания отделов, доступ только для админов', summary: 'Создание подразделения' })
  @ApiResponse({ status: 200, type: Depart })
  @UsePipes(ValidationPipe)
  // @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createDepartDto: CreateDepartDto) {
    return this.departsService.create(createDepartDto);
  }

  @Get()
  findAll() {
    return this.departsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartDto: UpdateDepartDto) {
    return this.departsService.update(+id, updateDepartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departsService.remove(+id);
  }
}
