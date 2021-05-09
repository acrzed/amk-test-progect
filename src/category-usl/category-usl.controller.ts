import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CategoryUslService } from './category-usl.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CatUsl } from './categoty-usl.models';

@ApiTags('Категории услуг')
@Controller('category-usl')
export class CategoryUslController {

  constructor(private categoryUslugService: CategoryUslService) {
  }

@ApiOperation({ summary: 'Создание категории услуг' })
@ApiResponse({ status: 200, type: CatUsl })
@Roles('ADMIN')
@UseGuards(RolesGuard)
  @Post()
createCategory(@Body() dto: CreateCategoryDTO){
  this.categoryUslugService.create(dto)
    .then( r => console.log('Создана категория услуг -',dto.name, 'описание -',dto.note))
}
}
