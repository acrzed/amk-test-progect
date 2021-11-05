import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

import { Depart } from './departs/depart.model';
import { UserPhone } from './user-phones/entities/user-phone.entity';
import { UserChannel } from './user-channels/entities/user-channel.entity';

export type UserDocument = User & Document

@Schema()
export class User {

  @ApiProperty({ example: 'ID', description: 'ID пользователя - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Ivan', description: 'имя пользователя' })
  @Prop({ required: true, unique: true, type: String })
  name: string;

  @ApiProperty({ example: '61688b4999c6f111736775f6', description: 'ID номера телефона пользователя' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserPhone' }], default: '61688b4999c6f111736775f6' })
  phones: ObjectId[];

  @ApiProperty({ example: '61688b4999c6f111736775f6', description: 'ID канала пользователя' })
  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserChannel'}] })
  channels: ObjectId[];

  @ApiProperty({ example: '61688b4999c6f111736775f6', description: 'ID подразделения' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Depart', default: '617d55819adb022f544fb735' })
  depart:  ObjectId;

  @ApiProperty({ example: '********', description: 'пароль не менее 8 символов, обязателен для админов и отдела продаж' })
  @Prop({ type: String, minlength: 8 })
  password: string;

  @ApiProperty({ example: 'ADMIN', description: 'Роли пользователя - допуск, ограничение, etc.' })
  @Prop({ ref: 'Roles', default: 'USER' })
  roles: [string, string, string];

  @ApiProperty({ example: 'лучший продажник', description: 'комментарий, описание' })
  @Prop({ type: String })
  description: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
