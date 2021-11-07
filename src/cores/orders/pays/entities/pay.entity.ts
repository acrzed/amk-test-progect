import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from '../../../users/user.model';
import { Client } from '../../../clients/entities/client.entity';
import { Order } from '../../entities/order.entity';


export type PayDocument = Pay & Document;

@Schema()
export class Pay {

  @ApiProperty({ example: 'ID', description: 'ID order - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Дата создания', description: 'Date' })
  @Prop({ type: Date, default: Date.now() })
  createDate: Date

  @ApiProperty({ required: true, example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idCreator: string;

  @ApiProperty({ required: true, example:'ClientID', description:'ID клиента'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  idClient: string

  @ApiProperty({ required: true, example:'OrderID', description:'ID заказа'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  idOrder: string

  @ApiProperty({ required: true, example: '01.01.2021 18:21', description: 'Дата и время оплаты' })
  @Prop({ type: Date })
  payDateTime: Date

  @ApiProperty({ required: true, example: '300', description: 'Сумма оплаты' })
  @Prop({ type: Number })
  paySum: number;

  @ApiProperty({ required: true, example: '', description: 'Хэш оплаты - строка: idOrder + дата + время + сумма' })
  @Prop({ type: String, unique: true, required: true })
  payHash: string;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  desc: string
}

export const PaySchema = SchemaFactory.createForClass(Pay);
