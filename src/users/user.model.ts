import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document

@Schema()
export class User {
  @ApiProperty({ example: 'ID', description: 'ID пользователя - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;
  @ApiProperty({ example: 'Ivan', description: 'имя пользователя' })
  @Prop({ require: true, unique: true, type: String })
  name: string;
  @ApiProperty({ example: '093********', description: 'телефон' })
  @Prop({ type: Number, minlength: 10 })
  phone: number;
  @ApiProperty({ example: 'SELLER', description: 'Отдел - продажа, производство, технический, административный и т.д.' })
  @Prop({ ref: 'Dept', default: 'STAFF' })
  dept: [string, string, string];
  @ApiProperty({ example: '********', description: 'пароль не менее 8 символов, обязателен для админов и отдела продаж' })
  @Prop({ type: String, minlength: 8 })
  password: string;
  @ApiProperty({ example: 'ADMIN', description: 'Роли пользователя - допуск, ограничение, etc.' })
  @Prop({ ref: 'Roles', default: 'USER' })
  roles: [string, string, string];
}

export const UserSchema = SchemaFactory.createForClass(User);
