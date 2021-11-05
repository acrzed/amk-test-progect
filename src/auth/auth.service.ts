import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCreateDto } from '../cores/users/dto/user-create.dto';
import { UsersService } from '../cores/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { User } from '../cores/users/user.model';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {
  }

  async login( userLoginDto: UserLoginDto){
    const user = await this.validateUser(userLoginDto)
    return this.generateToken(user)
  }

  async registration ( userDto: UserCreateDto){
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.createUser({...userDto, password:hashPassword})
    return this.generateToken(user)

  }
  private async generateToken(user: User){
    const payload = {name: user.name, id: user._id, role: user.roles }
    return {
      token: this.jwtService.sign(payload)
    }
  }
  private async validateUser(userLoginDto:UserLoginDto){
    const user = await this.userService.getUserByName(userLoginDto.name)
    const passwordEquals = await bcrypt.compare(userLoginDto.password, user.password)
    if(user && passwordEquals){
      return user
      }
    throw new UnauthorizedException({
      message:'Некорректное имя или пароль'})
  }
}
