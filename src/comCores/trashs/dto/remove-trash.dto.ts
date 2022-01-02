import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsString, Length } from 'class-validator';
import { User } from '../../../cores/users/user.model';
import { type } from 'os';


export class RemoveTrashDto {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ type: String, default: '' })
  // @IsString({ message:'требуется ID удаляющего пользователя - должен быть строкой'})
  // @Length(24, 24, {message: 'ID должен быть длиной 24 символа'})
  readonly idCreator: string;

  @ApiProperty({ example: 'комментарий', description: 'причина, заметки, описание' })
  @IsString({ message:'требуется комментарий - должен быть строкой'})
  @Length(5, 600, {message: 'причина удаления - от 5 до 600 знаков'})
  @Prop({ required: true, type: String })
  readonly desc: string
  readonly token: string
}
