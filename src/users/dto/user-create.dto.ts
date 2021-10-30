import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Prop } from '@nestjs/mongoose';

export class UserCreateDto {
  // имя
  @ApiProperty({example:'Ivan', description:'имя пользователя', required: true})
  @IsString({message:'Имя должно быть строкой'} )
  readonly name: string;
  // телефон
  @ApiProperty({example:'09309809898', description:'телефон пользователя', required: true})
  @Length(10,10, {message:'номер телефона вида 098*******, 10 цифр'})
  readonly phone: string;
  // канал
  @ApiProperty({example: 'Канал', description: 'Название канала - инстаграм, вайбер и т.д.'})
  @Prop({require: true, type: String, minlength: 5})
  readonly channel: string
  // ник
  @ApiProperty({example: 'Nickname', description: 'ник'})
  @Prop({require: true, type: String, minLength: 5})
  readonly nick: string
  // пароль
  @ApiProperty({example:'********', description:'пароль не менее 8 символов', required: true})
  @IsString({message:'Пароль должен быть строкой'} )
  @Length(8,18, {message:'длина пароля от 8 до 18 знаков'})
  readonly password: string

}
