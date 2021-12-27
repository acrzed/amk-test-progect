import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipientDto } from './create-recipient.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Length } from 'class-validator';
import { User } from '../../../../users/user.model';

export class RemoveRecipientDto extends PartialType(CreateRecipientDto) {


  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  readonly idCreator: User;

  @ApiProperty({ example: 'комментарий', description: 'причина, заметки, описание' })
  @Length(5, 600, {message: 'требуется комментарий - причина удаления'})
  @Prop({ required: true, type: String })
  readonly desc: string
}
