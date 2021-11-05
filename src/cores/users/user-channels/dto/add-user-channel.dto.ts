import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Length } from 'class-validator';
import * as mongoose from 'mongoose';
import { User } from '../../user.model';
import { ObjectId } from 'mongoose';

export class AddUserChannelDto {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID владельца номера канала' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  readonly idUser: User;

  @ApiProperty({example: 'Канал', description: 'Название канала - инстаграм, вайбер и т.д.'})
  @Prop({required: true, type: String, minlength: 5})
  readonly channel: string

  @ApiProperty({example: 'Nickname', description: 'ник'})
  @Prop({required: true, type: String, minLength: 5})
  readonly nick: string

  @ApiProperty({example:'заметки', description:'заметки, комментарии'})
  @Prop({ type: String })
  readonly desc: string;
}
