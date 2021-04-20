import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({example:'Ivan', description:'имя пользователя'})
  readonly name: string;
  @ApiProperty({example:'********', description:'пароль не менее 6 символов'})
  readonly password: string
  @ApiProperty({example:'ADMIN', description:'Роли пользователя - допуск, ограничение, etc.'})
  readonly roles: [string]
}
