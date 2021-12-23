import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from '../../users/user.model';
import { Client } from '../../clients/entities/client.entity';
import { Pay } from '../pays/entities/pay.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


export type OrderDocument = Order & Document;


@Schema()
export class Order {

  @ApiProperty({ example: 'ID', description: 'ID order - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @IsNotEmpty({ message: 'ID создателя заказа не может быть пустым!'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idCreator: User;

  @ApiProperty({example:'ID', description:'ID клиента'})
  @IsNotEmpty({ message: 'ID клиента заказа не может быть пустым!'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  idClient: Client

  @ApiProperty({ example: 'Дата создания заказа', description: 'Date' })
  @Prop({ type: Date, default: Date.now() })
  enterDate: Date

  @ApiProperty({ example: 'ID состояний типов контакта', description: 'заказ, обмен, возврат' })
  @Prop({ required: true, type: String, default: '619ba3e3448abb0744f03da2' })
  orderType: string;

  @ApiProperty({ example: 'ID состояний статуса заказа', description: 'принят - ожидание оплаты, оплачен - в обработке, в отправки, закрыт' })
  @Prop({ required: true, type: String, default: '619bb3e0a618d118bc885b74' })
  orderStatus: string;

  @ApiProperty({ example: 'заказ', description: 'содержимое заказа' })
  @IsNotEmpty({ message: 'содержимое заказа не может быть пустым!'})
  @IsString({message:'заказ должен быть строкой'})
  @Prop({ required: true, type: String })
  basket: string;

  @ApiProperty({ example: 'индпошив', description: 'индпошив в заказе' })
  @IsString({message:'индпошив в заказе должен быть строкой'})
  @Prop({ type: String })
  indPosh: string;

  @ApiProperty({ example: 'Предположительная дата готовности индопошива', description: 'Date' })
  @Prop({ type: String })
  indPoshDate: string

  @ApiProperty({ example: 'Цена индпошива', description: 'стоимость индпошива' })
  @IsNumber({ maxDecimalPlaces: 4 })
  @Prop({ type: Number })
  indPay: number;

  @ApiProperty({ example: 'Цена заказа', description: 'цена содержимого заказа в сумме' })
  @IsNotEmpty({ message: 'поле цена заказа не может быть пустым!'})
  @IsNumber({ maxDecimalPlaces: 4 })
  @Prop({ required: true, type: Number })
  orderSum: number;

  @ApiProperty({ example: 'Скидка', description: 'скидка в сумме' })
  @IsNumber({ maxDecimalPlaces: 4 })
  @Prop({ type: Number })
  orderSale: number;

  @ApiProperty({ example: 'Сумма к оплате', description: 'итого' })
  @IsNumber({ maxDecimalPlaces: 4 })
  @Prop({ required: true, type: Number })
  orderTotal: number;

  @ApiProperty({ example: 'ID оплаты', description: 'все оплаты клиента' })
  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pay'}] })
  pays: [string];

  @ApiProperty({ example: false, description: 'Заказ отменён' })
  @Prop({ required: true, type: Boolean, default: false })
  orderCancel: boolean;

  @ApiProperty({ example: '01.01.2021', description: 'дата и время обработки заказа' })
  @Prop({ type: Date, default: Date.now() })
  processDate: Date

  @ApiProperty({ example: true, description: 'Заказ подтверждён' })
  @Prop({ required: true, type: Boolean, default: false })
  orderConfirmed: boolean;

  @ApiProperty({ example: 'подтвержденный заказ', description: 'содержимое заказа' })
  @IsString({message:'содержимое заказа должно быть строкой'})
  @Prop({ required: true, type: String })
  confirmOrder: string;

  @ApiProperty({ example: 'ID посылок', description: 'все посылки заказа' })
  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Package'}] })
  packages: [string];

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @IsString({message:'комментарий должен быть строкой'})
  @Prop({ type: String })
  desc: string
}

export const OrderSchema = SchemaFactory.createForClass(Order);
