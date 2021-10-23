import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Length } from 'class-validator';
import { User } from '../../user.model';

export type UserChannelDocument = UserChannel & Document

@Schema()
export class UserChannel {

  @ApiProperty({ example: 'ID', description: 'ID канала - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'UserID', description: 'UserID - ID владельца номера канала' })
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Length(24, 24, {message: 'требуется ID владельца канала, длинной 24 символа'})
  idUser: ObjectId;

  @ApiProperty({example: 'Канал', description: 'Название канала - инстаграм, вайбер и т.д.'})
  @Prop({require:true, type: String})
  channel: string

  @ApiProperty({example: 'Nickname', description: 'ник'})
  @Prop({require:true, type: String})
  nick: string

  @ApiProperty({example:'заметки', description:'заметки, комментарии'})
  @Prop({ type: String })
  desc: string;

}

export const UserChannelSchema = SchemaFactory.createForClass(UserChannel)
