import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { DepartsService } from './departs.service';
import { CreateDepartDto } from './dto/create-depart.dto';
import { UpdateDepartDto } from './dto/update-depart.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Depart } from './depart.model';
import { Roles } from '../../../auth/role-auth.decorator';
import { RolesGuard } from '../../../auth/roles.guard';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { ObjectId } from 'mongoose';
import { RemoveDepartDto } from './dto/remove-depart.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@Roles('ADMIN')
@UseGuards(RolesGuard)
@ApiTags('Подразделения / отделы')
@Controller('api/departs')
export class DepartsController {
  constructor(private readonly departsService: DepartsService) {
  }


  @ApiOperation({
    description: 'Точка доступа для создания отделов, доступ только для админов',
    summary: 'Создание подразделения',
  })
  @ApiResponse({ status: 200, type: Depart })
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(@Body() createDepartDto: CreateDepartDto, @UploadedFile() image: Express.Multer.File): Promise<Depart> {
    console.log(createDepartDto, image);
    return this.departsService.create(createDepartDto, image);
  }

  @ApiOperation({
    description: 'Точка доступа для получения всех отделов, доступ только для админов',
    summary: 'Создание подразделения',
  })
  @ApiResponse({ status: 200, type: [Depart] })
  @Get()
  findAll(): Promise<Depart[]> {
    return this.departsService.findAll();
  }

  @ApiOperation({
    description: 'Точка доступа для получения отдела по ID, доступ только для админов',
    summary: 'Создание подразделения',
  })
  @ApiResponse({ status: 200, type: Depart })
  @Get(':id')
  findByID(@Param('id') id: ObjectId): Promise<Depart> {
    return this.departsService.findByID(id);
  }

  @ApiOperation({
    description: 'Точка доступа для получения отдела по названию, доступ только для админов',
    summary: 'Создание подразделения',
  })
  @ApiResponse({ status: 200, type: Depart })
  @Get(':name')
  findByName(@Param('name') name: string): Promise<Depart> {
    return this.departsService.findByName(name);
  }

  @ApiOperation({
    description: 'Точка доступа для изменения отделов, доступ только для админов',
    summary: 'Создание подразделения',
  })
  @ApiResponse({ status: 200, type: Depart })
  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateDepartDto: UpdateDepartDto, @UploadedFile() file: Express.Multer.File): Promise<Depart> {
    return this.departsService.update(id, updateDepartDto, file);
  }

  @ApiOperation({
    description: 'Точка доступа для удаления отделов, доступ только для админов',
    summary: 'Создание подразделения',
  })
  @ApiResponse({ status: 200, type: Depart })
  @Delete(':id')
  delete(@Param('id') id: ObjectId): Promise<Depart> {
    return this.departsService.remove(id);
  }
}
