import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

export type OrderTypeDocument = OrderType & Document

@Schema()
export class OrderType {

  @ApiProperty({ example: 'ID', description: 'ID order - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: String, unique: true })
  @ApiProperty({ example: 'тип заказа', description: 'заказ, обмен, возврат' })
  @IsNotEmpty({ message: 'тип заказа не может быть пустым!'})
  @IsString({message:'тип заказа должен быть строкой'})
  orderType: string;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  desc: string
}

export const OrderTypeSchema = SchemaFactory.createForClass(OrderType)
