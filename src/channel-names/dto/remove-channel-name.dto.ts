import { PartialType } from '@nestjs/mapped-types';
import { CreateChannelNameDto } from './create-channel-name.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import  { ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Length } from 'class-validator';

export class RemoveChannelNameDto extends PartialType(CreateChannelNameDto) {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Length(24, 24, {message: 'требуется ID пользователя удаляющего телефон, длинной 24 символа'})
  readonly idCreator: ObjectId;

  @ApiProperty({ example: 'комментарий', description: 'причина, заметки, описание' })
  @Length(5, 600, {message: 'требуется комментарий - причина удаления'})
  @Prop({ require: true, type: String })
  readonly desc: string
}
