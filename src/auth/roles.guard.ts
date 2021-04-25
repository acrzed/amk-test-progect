import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,

} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY,[
        context.getHandler(),
        context.getClass()
      ])
      if(!requiredRoles) {
        return true
      }
      const req = context.switchToHttp().getRequest()

      const authHeader = req.headers.authorization
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]

      if(bearer !== 'Bearer' || !token){
        throw new HttpException({message:'Неврный токен доступа'}, HttpStatus.FORBIDDEN)
      }
      const user = this.jwtService.verify(token)
      req.user = user
      return user.roles.some(role => requiredRoles.includes(role))
    } catch (e) {
      console.log(e)
      throw new HttpException({message: `Нет доступа, обратитесь к администратору`}, HttpStatus.FORBIDDEN)
    }

    // throw new Error('Method not implemented.');
  }}
