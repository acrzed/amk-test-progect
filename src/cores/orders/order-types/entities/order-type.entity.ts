import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type OrderTypeDocument = OrderType & Document

export class OrderType {

  @ApiProperty({ example: 'ID', description: 'ID order - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'тип заказа', description: 'заказ, обмен, возврат' })
  @Prop({ required: true, type: String, unique: true })
  type: string;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  desc: string
}

export const OrderTypeSchema = SchemaFactory.createForClass(OrderType)
