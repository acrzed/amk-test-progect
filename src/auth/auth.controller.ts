import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from '../users/dto/user-create.dto';
import { AuthService } from './auth.service';
import { User } from '../users/user.model';
import { UserLoginDto } from './dto/user-login.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
      }

  @ApiOperation({summary: 'Логин'})
  @ApiResponse({status:200, type: User})
  @Post('/login')
  login(@Body() userLoginDto: UserLoginDto){
    return this.authService.login(userLoginDto)
  }

  @ApiOperation({summary: 'Регистрация пользователя'})
  @ApiResponse({status:200, type: User})
  @Post('/reg')
  registration (@Body() userDto: UserCreateDto){
    return this.authService.registration(userDto)
  }
}
