import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {CreateCategoryMaterialDto} from './dto/create-category-material.dto'
import { CategoryMaterialService } from './category-material.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryMaterial } from './categoty-material.models';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../roles/roles.model';

@ApiTags('Категории закупочных материалов')
@Controller('category-material')
export class CategoryMaterialController {

  constructor(private categoryMaterialService: CategoryMaterialService) {
  }

  @ApiOperation({ summary: 'Создание категории материалов' })
  @ApiResponse({ status: 200, type: CategoryMaterial })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  createCategory(@Body() dto: CreateCategoryMaterialDto){
    this.categoryMaterialService.create(dto)
      .then(r => console.log('Создана категория материалов -',dto.name, 'описание -',dto.note))
  }
  @ApiOperation({ summary: 'Все категории' })
  @ApiResponse({ status: 200, type: [CategoryMaterial] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.categoryMaterialService.getAllCategories();
  }
  @ApiOperation({summary: 'Получение категории'})
  @ApiResponse({status:200, type: CategoryMaterial})
  @Get('/:value')
  async getCategoryByName(@Param('value') value: string){
    const category = this.categoryMaterialService.getCategoryByName(value);
    console.log(value,category)
    return category
  }
}
