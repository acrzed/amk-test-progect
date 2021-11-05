import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from '../../../../../users/user.model';
import { Client } from '../../../../../clients/entities/client.entity';
import { Length } from 'class-validator';


export type RecipientDocument = Recipient & Document;

@Schema()
export class Recipient {

  @ApiProperty({ example: 'ID', description: 'ID order - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idCreator: User;

  @ApiProperty({example:'ClientID', description:'ID клиента'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  idClient: Client

  @ApiProperty({example:'API NP Sender', description:'отправитель API NP'})
  @Prop({ type: String, default: 'SenderZed' })
  sender: string

  @ApiProperty({example:'Данилова', description:'Фамилия получателя'})
  @Prop({ required: true, type: String })
  lastName: string

  @ApiProperty({example:'Марьяна', description:'Имя получателя'})
  @Prop({ required: true, type: String })
  name: string

  @ApiProperty({example:'Александровна', description:'Отчество получателя'})
  @Prop({ type: String })
  middleName: string

  @ApiProperty({ example: '093********', description: 'телефон получателя' })
  @Length(10,10, {message:'требуется номер телефона вида 098*******, 10 цифр'})
  @Prop({ required: true, minlength: 10 })
  phone: number;

  @ApiProperty({ example: '01.01.2021', description: 'Дата создания' })
  @Prop({ type: Date, default: Date.now() })
  enterDate: Date

  @ApiProperty({ example: 'df9bc892-cdb3-11eb-8513-b88303659df5', description: 'API NP REF получателя' })
  @Prop({ type: String })
  ref: string

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  desc: string
}

export const RecipientSchema = SchemaFactory.createForClass(Recipient);
