import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString, Length } from 'class-validator';
import { Prop } from '@nestjs/mongoose';

export class UserCreateDto {

  // телефон
  @ApiProperty({example:'09309809898', description:'телефон пользователя', required: true})
  @IsEmpty({message: 'телефон пользователя не может быть пустым'})
  @Length(9,13, {message:'номер телефона вида 098*******'})
  readonly phone: string;

  // пароль
  @ApiProperty({example:'********', description:'пароль не менее 8 символов', required: true})
  @IsString({message:'Пароль должен быть строкой'} )
  @IsEmpty({message: 'пароль пользователя не может быть пустым'})
  @Length(8,18, {message:'длина пароля от 8 до 18 знаков'})
  readonly password: string

}
