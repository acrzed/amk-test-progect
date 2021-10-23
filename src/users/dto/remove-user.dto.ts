import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Length } from 'class-validator';
import * as mongoose from 'mongoose';
import { User } from '../user.model';


export class RemoveUserDto {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Length(24, 24, {message: 'требуется ID пользователя удаляющего телефон, длинной 24 символа'})
  readonly idCreator: User;

  @ApiProperty({ example: 'RemoveUserID', description: 'RemoveUserID - ID удаляемого пользователя' })
  @Length(24, 24, {message: 'требуется ID пользователя, запись которого удаляют, длинной 24 символа'})
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  readonly idRemoveUser: User;

  @ApiProperty({ example: 'комментарий', description: 'причина, заметки, описание' })
  @Length(5, 600, {message: 'требуется комментарий - причина удаления'})
  @Prop({ require: true, type: String })
  readonly desc: string
}
