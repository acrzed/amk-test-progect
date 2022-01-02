import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    const bearer = authHeader.split(' ')[0] === 'Bearer' ? 'Bearer' : ''
    const token = bearer === '' ? authHeader.split(' ')[0] : authHeader.split(' ')[1]
    if (!token) {
      console.log(token);
      throw new UnauthorizedException({ message: 'jwt-auth - Пользователь не авторизован' });
    }
    try {
      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
    }


  }
}
