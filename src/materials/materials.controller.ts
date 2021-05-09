import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MaterialsService } from './materials.service';
import { User } from '../users/user.model';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Material } from './material.models';

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
}
