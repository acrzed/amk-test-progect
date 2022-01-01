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
    private reflector: Reflector,
  ) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();

    const token = req.headers.authorization;
    // console.log(authHeader)
    // const bearer = authHeader.split(' ')[0]
    // const token = authHeader.split(' ')[1]
    // console.log(token)

    if (!token) {
      throw new HttpException({ message: 'Неверный токен доступа' }, HttpStatus.FORBIDDEN);
    }
    try {
      const user = this.jwtService.verify(token);
      req.user = user;
      return user.role.some(roles => requiredRoles.includes(roles));
    } catch (e) {
      console.log(e);
    }
  }
}
