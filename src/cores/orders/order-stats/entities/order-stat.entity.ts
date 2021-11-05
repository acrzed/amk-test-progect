import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type OrderStatDocument = OrderStat & Document

export class OrderStat {

  @ApiProperty({ example: 'ID', description: 'ID order - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'состояние, статус заказа', description: 'принят - ожидание оплаты, оплачен - в обработке, в отправки, закрыт' })
  @Prop({ required: true, type: String, unique: true })
  status: string;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  desc: string
}

export const OrderStatSchema = SchemaFactory.createForClass(OrderStat)
