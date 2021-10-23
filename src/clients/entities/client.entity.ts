import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from '../../users/user.model';
import { Channel } from './channel.entity' ;
import { Order } from '../orders/entities/order.entity';


export type ClientDocument = Client & Document

@Schema()
export class Client {
  @ApiProperty({ example: 'ID', description: 'ID клиента - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;
  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idCreator: User;
  @ApiProperty({ example: 'Дата первого контакта', description: 'Date' })
  @Prop({ type: Date, default: Date.now() })
  enterDate: Date
  @ApiProperty({ example: 'Instagram - Ivan8768', description: 'канал входа, мессенджер клиента, ник клиента, комментарий' })
  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Channel'}] })
  channel: Channel[];
  @ApiProperty({ example: '093********', description: 'телефон клиента' })
  @Prop({ type: [Number], minlength: 10 })
  phone: [number, number, number];
  @ApiProperty({ example: 'Ivan', description: 'имя клиента' })
  @Prop({ type: String })
  name: string;
  @ApiProperty({ example: 'Заказы клиента', description: 'все заказы клиента' })
  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}] })
  order: Order[];
  @ApiProperty({ example: 'очень нудный, петляй сразу', description: 'комментарий, описание' })
  @Prop({ type: String })
  desc: string
}

export const ClientSchema = SchemaFactory.createForClass(Client)
