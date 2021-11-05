import { PartialType } from '@nestjs/mapped-types';
import { CreateChannelNameDto } from './create-channel-name.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import  { ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Length } from 'class-validator';
import { User } from '../../../cores/users/user.model';

export class RemoveChannelNameDto extends PartialType(CreateChannelNameDto) {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User', maxlength:24, minlength:24 })
  readonly idCreator: User;

  @ApiProperty({ example: 'комментарий', description: 'причина, заметки, описание' })
  @Length(5, 600, {message: 'требуется комментарий - причина удаления'})
  @Prop({ required: true, type: String })
  readonly desc: string
}
