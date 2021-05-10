import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MaterialsService } from './materials.service';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Material } from './material.models';
import { CreateMaterialDto } from './dto/create-material.dto';

@ApiTags('Материалы')
@Controller('materials')
export class MaterialsController {
  constructor(private materialService: MaterialsService) {
  }
  @ApiOperation({ summary: 'Все материалы' })
  @ApiResponse({ status: 200, type: [Material] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.materialService.getAllMaterial();
  }
  @ApiOperation({ summary: 'Создание материала' })
  @ApiResponse({ status: 200, type: Material })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.createMaterial(createMaterialDto);
  }
}
