import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document

@Schema()
export class User {
  @ApiProperty({example:'ID', description:'ID пользователя - автоматически'})
  _id: mongoose.Schema.Types.ObjectId
  @ApiProperty({example:'Ivan', description:'имя пользователя'})
  @Prop({require:true, unique: true, type: String})
  name: string
  @ApiProperty({example:'********', description:'пароль не менее 6 символов'})
  @Prop({ require: true, type: String, minlength: 6 })
  password: string;
  @ApiProperty({example:'ADMIN', description:'Роли пользователя - допуск, ограничение, etc.'})
  @Prop({ ref: 'Roles', default: 'USER'})
  roles: [string, string,string];
}

export const UserSchema = SchemaFactory.createForClass(User);
