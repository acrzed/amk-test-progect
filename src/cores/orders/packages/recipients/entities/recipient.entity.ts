import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from '../../../../users/user.model';
import { Client } from '../../../../clients/entities/client.entity';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';


export type RecipientDocument = Recipient & Document;

@Schema()
export class Recipient {

  @ApiProperty({ example: 'ID', description: 'ID order - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ required: true, example: 'UserID', description: 'UserID - ID создателя' })
  @IsNotEmpty({ message: 'ID создателя не может быть пустым!'})
  @IsString({message:'должно быть строкой'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idCreator: User;

  @ApiProperty({ required: true, example:'ClientID', description:'ID клиента'})
  @IsNotEmpty({ message: 'ID клиента не может быть пустым!'})
  @IsString({message:'должно быть строкой'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  idClient: Client

  @ApiProperty({example:'API NP Sender', description:'отправитель API NP'})
  @Prop({ type: String, default: 'SenderZed' })
  sender: string

  @ApiProperty({example:'Данилова', description:'Фамилия получателя'})
  @Length(2,20, {message:'требуется lastName: Фамилия получателя'})
  @IsNotEmpty({ message: 'Поле фамилии не может быть пустым!'})
  @IsString({message:'Фамилия должна быть строкой'})
  @Prop({ required: true, type: String })
  lastName: string

  @ApiProperty({example:'Марьяна', description:'Имя получателя'})
  @Length(2,20, {message:'требуется name: Имя получателя'})
  @IsNotEmpty({ message: 'Поле имени не может быть пустым!'})
  @IsString({message:'имя должно быть строкой'})
  @Prop({ required: true, type: String })
  name: string

  @ApiProperty({example:'Александровна', description:'Отчество получателя'})
  @IsNotEmpty({ message: 'Поле отчества не может быть пустым!'})
  @Length(2,20, {message:'требуется middleName: Отчество получателя'})
  @IsString({message:'Отчество должно быть строкой'})
  @Prop({ type: String })
  middleName: string

  @ApiProperty({ example: '093********', description: 'телефон получателя', type: Number })
  @IsNotEmpty({ message: 'Поле телефон получателя не может быть пустым!'})
  @IsNumber({maxDecimalPlaces: 12}, {message: 'требуется номер телефона вида 098*******, 10 цифр'})
  @Prop({ required: true, minlength: 12, maxlength: 12, type: Number })
  phone: number;

  @ApiProperty({ example: '01.01.2021', description: 'Дата создания' })
  @Prop({ type: Date, default: Date.now() })
  enterDate: Date

  @ApiProperty({ example: 'df9bc892-cdb3-11eb-8513-b88303659df5', description: 'API NP REF получателя', uniqueItems: true })
  @Prop({ type: String, unique: true })
  ref: string

  @ApiProperty({ example: 'Фамилия Имя Отчество Телефон', description: 'поисковый токен получателя' })
  @Prop({ type: String })
  recipientToken: string

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  desc: string
}

export const RecipientSchema = SchemaFactory.createForClass(Recipient);
