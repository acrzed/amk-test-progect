import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/roles.guard';
import { Roles } from '../../../../auth/role-auth.decorator';
import { City } from './entities/city.entity';
import { RemoveTrashDto } from '../../../../comCores/trashs/dto/remove-trash.dto';

@ApiTags('Города')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Roles('ADMIN', 'SELLER')
@Controller('api/cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiOperation({ summary: 'Добавить новый город' ,description:'Точка доступа для добавления новых городов, доступ только для админов и продажников' })
  @ApiResponse({ status: 200, type: City})
  @Post()
  create(@Body() createCityDto: CreateCityDto): Promise<City>  {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  findAll(): Promise<City[]>  {
    return this.citiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<City>  {
    return this.citiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto): Promise<City>  {
    return this.citiesService.update(id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() dto: RemoveTrashDto): Promise<City>  {
    return this.citiesService.remove(id, dto);
  }
}
