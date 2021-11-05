import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { postService } from './post-services.service';
import { CreatePostServiceDto } from './dto/create-post-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientChannel } from '../../../../../clients/client-channels/entities/client-channel.entity';
import { JwtAuthGuard } from '../../../../../../auth/jwt-auth.guard';
import { Roles } from '../../../../../../auth/role-auth.decorator';
import { RolesGuard } from '../../../../../../auth/roles.guard';
import { PostService } from './entities/postService.entity';

@ApiTags('почтовые способы доставки')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Roles('ADMIN')
@Controller('postServices')
export class postServicesController {
  constructor(private readonly postServices: postService) {}

  @ApiOperation({ summary: 'отделение-отделение', description:'Добавить способ доставки, доступ только для админов' })
  @ApiResponse({ status: 200, type: ClientChannel })
  @Post()
  create(@Body() dto: CreatePostServiceDto): Promise<PostService> {
    return this.postServices.create(dto);
  }

  @Get()
  findAll() {
    return this.postServices.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postServices.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.postServices.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postServices.remove(+id);
  }
}
