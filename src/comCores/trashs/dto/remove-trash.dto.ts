import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsString, Length } from 'class-validator';
import { User } from '../../../cores/users/user.model';


export class RemoveTrashDto {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @IsString({ message:'требуется ID удаляющего пользователя - должен быть строкой'})
  @Length(24, 24, {message: 'ID должен быть длиной 24 символа'})
  readonly idCreator: string;

  @ApiProperty({ example: 'комментарий', description: 'причина, заметки, описание' })
  @IsString({ message:'требуется комментарий - должен быть строкой'})
  @Length(5, 600, {message: 'причина удаления - до 600 знаков'})
  @Prop({ required: true, type: String })
  readonly desc: string
}
