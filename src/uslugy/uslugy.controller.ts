import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UslugyService } from './uslugy.service';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Usluga } from './usluga.models';
import { CreateUslugyDto } from './dto/create-uslugy.dto';

@ApiTags('Услуги')
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
  create(@Body() createUslugyDto: CreateUslugyDto) {
    return this.uslugyService.createUslugy(createUslugyDto);
  }
}
