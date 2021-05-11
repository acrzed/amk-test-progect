import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryUslugService } from './category-uslug.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateCategoryUslugDto } from './dto/create-category-uslug.dto';
import { CategoryUslug } from './categoty-uslug.models';
import { CategoryMaterial } from '../category-material/categoty-material.models';
import { ValidationException } from '../exception/ValidationException';

@ApiTags('Категории услуг')
@Controller('category-uslug')
export class CategoryUslugController {

  constructor(private categoryUslugService: CategoryUslugService) {
  }

  @ApiOperation({ summary: 'Создание категории услуг' })
  @ApiResponse({ status: 200, type: CategoryUslug })
  @UsePipes(ValidationPipe)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  async createCategory(@Body() dto: CreateCategoryUslugDto) {
    if (await this.categoryUslugService.getCategoryByName(dto.name)) {
      throw new ValidationException({ message: `ошибка - категория услуг ${dto.name} уже существует` })
    }
    return this.categoryUslugService.create(dto)
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
