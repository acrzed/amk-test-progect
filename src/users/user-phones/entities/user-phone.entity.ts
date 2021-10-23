import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user.model';

export type UserPhoneDocument = UserPhone & Document

@Schema()
export class UserPhone {

  @ApiProperty({ example: 'ID Phone', description: 'ID номера телефона - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'UserID', description: 'UserID - ID владельца номера телефона' })
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Length(24, 24, {message: 'требуется ID владельца номера телефона, длинной 24 символа'})
  idUser: User;

  @ApiProperty({example: 'Номер телефона пользователя', description: 'Номер телефона пользователя'})
  @Prop({require:true, type: String})
  phone: string

  @ApiProperty({example:'заметки', description:'заметки, комментарии'})
  @Prop({ type: String })
  desc: string;

}

export const UserPhoneSchema = SchemaFactory.createForClass(UserPhone)

