import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCreateDto } from '../cores/users/dto/user-create.dto';
import { UsersService } from '../cores/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../cores/users/user.model';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async login(userLoginDto: UserLoginDto) {
    console.log(userLoginDto)
    const user = await this.validateUser(userLoginDto);
    return this.generateToken(user);
  }

  async registration(userDto: UserCreateDto) {
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });
    if (user){
      console.log('AuthService - Добавлен новый пользователь - ', user);
      return this.generateToken(user);
    }
  }

  private async generateToken(user: User) {
    // console.log('generateToken - ', user)
    const payload = { id: user._id, role: user.roles, dept: user.depart };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userLoginDto: UserLoginDto) {
    const user = await this.userService.getUserByPhone(userLoginDto.phone);
    const passwordEquals = await bcrypt.compare(userLoginDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Неверный пароль',
    });
  }
}
