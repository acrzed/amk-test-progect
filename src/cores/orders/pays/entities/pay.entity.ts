import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from '../../../users/user.model';
import { Client } from '../../../clients/entities/client.entity';
import { Order } from '../../entities/order.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export type PayDocument = Pay & Document;

@Schema()
export class Pay {

  @ApiProperty({ example: 'ID', description: 'ID order - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Дата создания', description: 'Date' })
  @Prop({ type: Date, default: Date.now() })
  createDate: Date

  @ApiProperty({ required: true, example: 'UserID', description: 'UserID - ID создателя' })
  @IsNotEmpty({ message: 'ID создателя не может быть пустым!'})
  @IsString({message:'должно быть строкой'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idCreator: string;

  @ApiProperty({ required: true, example:'ClientID', description:'ID клиента'})
  @IsNotEmpty({ message: 'ID клиента не может быть пустым!'})
  @IsString({message:'должно быть строкой'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  idClient: string

  @ApiProperty({ required: true, example:'OrderID', description:'ID заказа'})
  @IsNotEmpty({ message: 'ID заказа не может быть пустым!'})
  @IsString({message:'должно быть строкой'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  idOrder: string

  @ApiProperty({ required: true, example: '01.01.2021 18:21', description: 'Дата и время оплаты' })
  @IsNotEmpty({ message: 'Дата и время оплаты не может быть пустыми!'})
  @IsString({message:'должно быть строкой'})
  @Prop({ type: Date })
  payDateTime: Date

  @ApiProperty({ required: true, example: '300', description: 'Сумма оплаты' })
  @IsNotEmpty({ message: 'Сумма оплаты не может быть пустой!'})
  @IsNumber()
  @Prop({ type: Number })
  paySum: number;

  @ApiProperty({ required: true, uniqueItems:true, type: String,  example: '', description: 'Хэш оплаты - строка: idOrder + дата + время + сумма' })
  @IsString({message:'должно быть строкой'})
  @Prop({ type: String, unique: true, required: true })
  payHash: string;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @IsString({message:'должно быть строкой'})
  @Prop({ type: String })
  desc: string
}

export const PaySchema = SchemaFactory.createForClass(Pay);
