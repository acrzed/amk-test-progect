import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCategoryMaterialDto } from './dto/create-category-material.dto';
import { CategoryMaterialService } from './category-material.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryMaterial } from './categoty-material.models';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ValidationException } from '../exception/ValidationException';

@ApiTags('Категории закупочных материалов')
@UsePipes(ValidationPipe)
@Controller('category-material')
export class CategoryMaterialController {

  constructor(private categoryMaterialService: CategoryMaterialService) {
  }

  @ApiOperation({ summary: 'Создание категории материалов' })
  @ApiResponse({ status: 200, type: CategoryMaterial })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  async createCategory(@Body() dto: CreateCategoryMaterialDto){
    if (await this.categoryMaterialService.getCategoryByName(dto.name)) {
      throw new ValidationException({ message: `ошибка - категория материалов ${dto.name} уже существует` })
    }
    return this.categoryMaterialService.create(dto)
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
  async getCategoryByName(@Param('value') name: string){
    return this.categoryMaterialService.getCategoryByName(name)
  }
}
