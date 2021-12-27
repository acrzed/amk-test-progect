import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/roles.guard';
import { Roles } from '../../../../auth/role-auth.decorator';
import { PostSrv } from './entities/postSrv.entity';
import { RemoveTrashDto } from '../../../../comCores/trashs/dto/remove-trash.dto';

@ApiTags('Почтовые службы доставки')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Roles('ADMIN', 'SELLER')
@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Добавить новую службу доставки' ,description:'Точка доступа для добавления новых видов почты, доставки и т.п., доступ только для админов и продажников' })
  @ApiResponse({ status: 200, type: PostSrv})
  @Post()
  create(@Body() dto: CreatePostDto): Promise<PostSrv> {
    return this.postsService.create(dto);
  }


  @ApiOperation({ summary: 'Все службы доставки' ,description:'Точка доступа для получения всех видов почты, доставки и т.п., доступ только для админов и продажников' })
  @ApiResponse({ status: 200, type: [PostSrv]})
  @Get()
  findAll(): Promise<PostSrv[]> {
    return this.postsService.findAll();
  }


  @ApiOperation({ summary: 'Получить службу доставки по ID' ,description:'Точка доступа для получения почтового сервиса по ID, доступ только для админов и продажников' })
  @ApiResponse({ status: 200, type: PostSrv})
  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostSrv>  {
    return this.postsService.findOne(id);
  }


  @ApiOperation({ summary: 'Изменить службу доставки' ,description:'Точка доступа для изменения почты, доставки и т.п., доступ только для админов и продажников' })
  @ApiResponse({ status: 200, type: PostSrv})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Удалить службу доставки' ,description:'Точка доступа для удаления почты, доставки и т.п., доступ только для админов и продажников' })
  @ApiResponse({ status: 200, type: PostSrv})
  @Delete(':id')
  remove(@Param('id') id: string, @Body() dto: RemoveTrashDto) {
    return this.postsService.remove(id, dto);
  }
}
