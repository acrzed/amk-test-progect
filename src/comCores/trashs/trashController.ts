import { Body, Controller, Delete, Get, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TrashService } from './trash.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/role-auth.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { Trash } from './entities/trash.entity';
import { User } from '../../cores/users/user.model';
import { RemoveTrashDto } from './dto/remove-trash.dto';

@ApiTags('Удалённые записи')
@Controller('trash')
export class TrashController {
  constructor(private readonly trashService: TrashService) {}

  @ApiOperation({ description:'Точка доступа для получения всех записей корзины, доступ только для админов', summary: 'Создание подразделения' })
  @ApiResponse({ status: 200, type: [Trash] })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll(): Promise<Trash[]> {
    return this.trashService.findAll();
  }

  @ApiOperation({ description:'Точка доступа для получения всех записей корзины, доступ только для админов', summary: 'Создание подразделения' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete()
  removeAll(@Body() dto: RemoveTrashDto): Promise<User> {
    return this.trashService.removeAll(dto);
  }
}
