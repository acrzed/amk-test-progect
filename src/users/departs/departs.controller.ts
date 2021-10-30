import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { DepartsService } from './departs.service';
import { CreateDepartDto } from './dto/create-depart.dto';
import { UpdateDepartDto } from './dto/update-depart.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Depart } from './depart.model';
import { Roles } from '../../auth/role-auth.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ObjectId } from 'mongoose';
import { RemoveDepartDto } from './dto/remove-depart.dto';

@ApiTags('Подразделения / отделы')
@Controller('dept')
export class DepartsController {
  constructor(private readonly departsService: DepartsService) {}

  @ApiOperation({ description:'Точка доступа для создания отделов, доступ только для админов', summary: 'Создание подразделения' })
  @ApiResponse({ status: 200, type: Depart })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createDepartDto: CreateDepartDto): Promise<Depart> {
    return this.departsService.create(createDepartDto);
  }

  @ApiOperation({ description:'Точка доступа для получения всех отделов, доступ только для админов', summary: 'Создание подразделения' })
  @ApiResponse({ status: 200, type: [Depart] })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll(): Promise<Depart[]> {
    return this.departsService.findAll();
  }

  @ApiOperation({ description:'Точка доступа для получения отдела по ID, доступ только для админов', summary: 'Создание подразделения' })
  @ApiResponse({ status: 200, type: Depart })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('id/:id')
  findByID(@Param('id') id: ObjectId): Promise<Depart> {
    return this.departsService.findByID(id);
  }

  @ApiOperation({ description:'Точка доступа для получения отдела по названию, доступ только для админов', summary: 'Создание подразделения' })
  @ApiResponse({ status: 200, type: Depart })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get(':name')
  findByName(@Param('name') name: string): Promise<Depart> {
    return this.departsService.findByName(name);
  }

  @ApiOperation({ description:'Точка доступа для изменения отделов, доступ только для админов', summary: 'Создание подразделения' })
  @ApiResponse({ status: 200, type: Depart })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateDepartDto: UpdateDepartDto): Promise<Depart> {
    return this.departsService.update(id, updateDepartDto);
  }

  @ApiOperation({ description:'Точка доступа для удаления отделов, доступ только для админов', summary: 'Создание подразделения' })
  @ApiResponse({ status: 200, type: Depart })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: ObjectId, @Body() dto: RemoveDepartDto): Promise<Depart>{
    return this.departsService.remove(id, dto);
  }
}
