import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document

@Schema()
export class User {
  @ApiProperty({example:'Ivan', description:'имя пользователя'})
  @Prop({require:true, unique: true, type: String})
  name: string
  @ApiProperty({example:'********', description:'пароль не менее 6 символов'})
  @Prop({ require: true, type: String, minlength: 6 })
  password: string;
  @ApiProperty({example:'ADMIN', description:'Роли пользователя - допуск, ограничение, etc.'})
  @Prop({ type: String,  ref: 'Roles', default: 'USER'})
  roles: [];
}

export const UserSchema = SchemaFactory.createForClass(User);
