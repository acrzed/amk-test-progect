import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UslugyService } from './uslugy.service';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Usluga } from './usluga.models';
import { CreateUslugyDto } from './dto/create-uslugy.dto';
import { ValidationException } from '../exception/ValidationException';
import { NoUniqueNameException } from '../exception/NoUniqueNameException';

@ApiTags('Услуги')
@UsePipes(ValidationPipe)
@Controller('uslugy')
export class UslugyController {
  constructor(private uslugyService: UslugyService) {
  }
  @ApiOperation({ summary: 'Все услуги' })
  @ApiResponse({ status: 200, type: [Usluga] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.uslugyService.getAllUslugy();
  }
  @ApiOperation({ summary: 'Создание услуги' })
  @ApiResponse({ status: 200, type: Usluga })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createUslugyDto: CreateUslugyDto) {
    if (await this.uslugyService.getUsluguByName(createUslugyDto.name)){
      throw new NoUniqueNameException({ message: `ошибка - услуга ${createUslugyDto.name} уже существует` })
    }
    if (!await this.uslugyService.getCategoryByName(createUslugyDto.category)){
      throw new ValidationException({ message:
          `ошибка выбора категории - ${createUslugyDto.category}, такой категории не существует` })
    }
    return this.uslugyService.createUslugy(createUslugyDto);
  }
}
