import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Length } from 'class-validator';
import { User } from '../../users/user.model';


export class RemoveTrashDto {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Length(24, 24, {message: 'требуется ID пользователя удаляющего канал, длинной 24 символа'})
  readonly idCreator: User;

  @ApiProperty({ example: 'комментарий', description: 'причина, заметки, описание' })
  @Length(5, 600, {message: 'требуется комментарий - причина удаления'})
  @Prop({ require: true, type: String })
  readonly desc: string
}
