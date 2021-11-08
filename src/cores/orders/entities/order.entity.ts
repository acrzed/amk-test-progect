import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from '../../users/user.model';
import { Client } from '../../clients/entities/client.entity';
import { Pay } from '../pays/entities/pay.entity';


export type OrderDocument = Order & Document;

@Schema()
export class Order {

  @ApiProperty({ example: 'ID', description: 'ID order - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idCreator: User;

  @ApiProperty({example:'ID', description:'ID клиента'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  idClient: Client

  @ApiProperty({ example: 'Дата создания заказа', description: 'Date' })
  @Prop({ type: Date, default: Date.now() })
  enterDate: Date

  @ApiProperty({ example: 'набор состояний типов контакта', description: 'заказ, обмен, возврат' })
  @Prop({ required: true, type: String, default: 'заказ' })
  orderType: string;

  @ApiProperty({ example: 'набор состояний статуса заказа', description: 'принят - ожидание оплаты, оплачен - в обработке, в отправки, закрыт' })
  @Prop({ required: true, type: String, default: 'принят - ожидание оплаты' })
  orderStatus: string;

  @ApiProperty({ example: 'заказ', description: 'содержимое заказа' })
  @Prop({ required: true, type: String })
  basket: string;

  @ApiProperty({ example: 'индпошив', description: 'индпошив в заказе' })
  @Prop({ type: String })
  indPosh: string;

  @ApiProperty({ example: 'Предположительная дата готовности индопошива', description: 'Date' })
  @Prop({ type: String })
  indPoshDate: string

  @ApiProperty({ example: 'Цена индпошива', description: 'стоимость индпошива' })
  @Prop({ type: Number })
  indPay: number;

  @ApiProperty({ example: 'Цена заказа', description: 'цена содержимого заказа в сумме' })
  @Prop({ required: true, type: Number })
  orderSum: number;

  @ApiProperty({ example: 'Скидка', description: 'скидка в сумме' })
  @Prop({ type: Number })
  orderSale: number;

  @ApiProperty({ example: 'Сумма к оплате', description: 'итого' })
  @Prop({ required: true, type: Number })
  orderTotal: number;

  @ApiProperty({ example: true, description: 'Заказ подтверждён' })
  @Prop({ required: true, type: Boolean, default: false })
  orderConfirmed: boolean;

  @ApiProperty({ example: false, description: 'Заказ отменён' })
  @Prop({ required: true, type: Boolean, default: false })
  orderCancel: boolean;

  @ApiProperty({ example: 'ID оплаты', description: 'все оплаты клиента' })
  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pay'}] })
  pays: [string];

  @ApiProperty({ example: 'ID оплаты', description: 'все получатели клиента' })
  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dispatch'}] })
  dispatchs: [string];

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  desc: string
}

export const OrderSchema = SchemaFactory.createForClass(Order);