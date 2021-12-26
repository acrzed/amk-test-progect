import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DispatchsService } from './dispatchs.service';
import { CreateDispatchDto } from './dto/create-dispatch.dto';
import { UpdateDispatchDto } from './dto/update-dispatch.dto';

@Controller('api/dispatchs')
export class DispatchsController {
  constructor(private readonly dispatchsService: DispatchsService) {}

  @Post()
  create(@Body() createDispatchDto: CreateDispatchDto) {
    return this.dispatchsService.create(createDispatchDto);
  }

  @Get()
  findAll() {
    return this.dispatchsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dispatchsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDispatchDto: UpdateDispatchDto) {
    return this.dispatchsService.update(+id, updateDispatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dispatchsService.remove(+id);
  }
}
