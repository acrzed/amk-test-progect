import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Dept } from '../depts/dept.model';



export type UserDocument = User & Document

@Schema()
export class User {
  @ApiProperty({ example: 'ID', description: 'ID пользователя - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;
  @ApiProperty({ example: 'Ivan', description: 'имя пользователя' })
  @Prop({ require: true, unique: true, type: String })
  name: string;
  @ApiProperty({ example: '093********', description: 'телефон пользователя' })
  @Prop({ type: Number, minlength: 10 })
  phone: number;
  @ApiProperty({ example: '61688b4999c6f111736775f6', description: 'ID подразделения' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'dept', default: '61688b4999c6f111736775f6' })
  dept:  string;
  @ApiProperty({ example: '********', description: 'пароль не менее 8 символов, обязателен для админов и отдела продаж' })
  @Prop({ type: String, minlength: 8 })
  password: string;
  @ApiProperty({ example: 'ADMIN', description: 'Роли пользователя - допуск, ограничение, etc.' })
  @Prop({ ref: 'Roles', default: 'USER' })
  roles: [string, string, string];
}

export const UserSchema = SchemaFactory.createForClass(User);
