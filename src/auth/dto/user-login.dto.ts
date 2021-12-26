import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Prop } from '@nestjs/mongoose';


export class UserLoginDto {

  // имя
  @ApiProperty({example: 'Номер телефона пользователя', description: 'Номер телефона пользователя'})
  @IsNotEmpty({ message: 'Номер телефона пользователя не может быть пустым!'})
  @IsString({message:'Номер телефона должен быть строкой'} )
  @Prop({required:true, type: String})
  readonly phone: string;

  // пароль
  @ApiProperty({example:'********', description:'пароль не менее 8 символов', required: true})
  @IsString({message:'Пароль должен быть строкой'} )
  @Length(6,18, {message:'длина пароля от 8 до 18 знаков'})
  readonly password: string

}
