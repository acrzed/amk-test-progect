import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MaterialsService } from './materials.service';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Material } from './material.models';
import { CreateMaterialDto } from './dto/create-material.dto';
import { CategoryMaterial } from '../category-material/categoty-material.models';
import { ValidationException } from '../exception/ValidationException';

@ApiTags('Материалы')
@UsePipes(ValidationPipe)
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
  async create(@Body() createMaterialDto: CreateMaterialDto) {
    if (await this.materialService.getMaterialByName(createMaterialDto.name)){
      throw new ValidationException({ message: `ошибка - материал ${createMaterialDto.name} уже существует` })
      }
    if (!await this.materialService.getCategoryByName(createMaterialDto.category)){
      throw new ValidationException({ message:
          `ошибка выбора категории - ${createMaterialDto.category}, такой категории не существует` })
    }
    return this.materialService.createMaterial(createMaterialDto);
  }
  @ApiOperation({summary: 'Получение материала'})
  @ApiResponse({status:200, type: CategoryMaterial})
  @Get('/:value')
  async getCategoryByName(@Param('value') name: string){
    return this.materialService.getMaterialByName(name)
  }
}
