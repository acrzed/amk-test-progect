import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from '../users/user.model';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
      }

  @ApiOperation({summary: 'Логин'})
  @ApiResponse({status:200, type: User})
  @Post('/login')
  login(@Body() userDto: CreateUserDto){
    return this.authService.login(userDto)
  }

  @ApiOperation({summary: 'Регистрация пользователя'})
  @ApiResponse({status:200, type: User})
  @Post('/reg')
  registration (@Body() userDto: CreateUserDto){
    return this.authService.registration(userDto)
  }
}
