import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({example:'Ivan', description:'имя пользователя'})
  @IsString({message:'Имя должно быть строкой'} )
  readonly name: string;
  @ApiProperty({example:'********', description:'пароль не менее 6 символов'})
  @IsString({message:'Пароль должен быть строкой'} )
  @Length(6,18, {message:'длина пароля от 6 до 18 знаков'})
  readonly password: string
  @ApiProperty({example:'ADMIN', description:'Роли пользователя - допуск, ограничение, etc.'})
  readonly roles: [string]
}
