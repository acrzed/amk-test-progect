import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryUslugService } from './category-uslug.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateCategoryUslugDto } from './dto/create-category-uslug.dto';
import { CategoryUslug } from './categoty-uslug.models';
import { CategoryMaterial } from '../category-material/categoty-material.models';

@ApiTags('Категории услуг')
@Controller('category-uslug')
export class CategoryUslugController {

  constructor(private categoryUslugService: CategoryUslugService) {
  }

  @ApiOperation({ summary: 'Создание категории услуг' })
  @ApiResponse({ status: 200, type: CategoryUslug })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  createCategory(@Body() dto: CreateCategoryUslugDto) {
    this.categoryUslugService.create(dto)
      .then(r => console.log('Создана категория услуг -', dto.name, 'описание -', dto.note));
  }
  @ApiOperation({ summary: 'Все категории' })
  @ApiResponse({ status: 200, type: [CategoryMaterial] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.categoryUslugService.getAllCategories();
  }
}
