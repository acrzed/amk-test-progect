import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';


export class UserLoginDto {

  // имя
  @ApiProperty({example:'Ivan', description:'имя пользователя', required: true})
  @IsString({message:'Имя должно быть строкой'} )
  readonly name: string;

  // пароль
  @ApiProperty({example:'********', description:'пароль не менее 8 символов', required: true})
  @IsString({message:'Пароль должен быть строкой'} )
  @Length(6,18, {message:'длина пароля от 8 до 18 знаков'})
  readonly password: string

}
