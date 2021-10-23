import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Length } from 'class-validator';
import * as mongoose from 'mongoose';
import { User } from '../../user.model';
import { ObjectId } from 'mongoose';

export class AddUserChannelDto {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID владельца номера канала' })
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Length(24, 24, {message: 'требуется ID владельца канала, длинной 24 символа'})
  idUser: ObjectId;

  @ApiProperty({example: 'Канал', description: 'Название канала - инстаграм, вайбер и т.д.'})
  @Prop({require: true, type: String, minlength: 5})
  channel: string

  @ApiProperty({example: 'Nickname', description: 'ник'})
  @Prop({require: true, type: String, minLength: 5})
  nick: string

  @ApiProperty({example:'заметки', description:'заметки, комментарии'})
  @Prop({ type: String })
  desc: string;
}
