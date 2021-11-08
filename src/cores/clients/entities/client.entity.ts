import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from '../../users/user.model';
import { Order } from '../../orders/entities/order.entity';
import { ClientChannel } from '../client-channels/entities/client-channel.entity';
import { ClientPhone } from '../client-phones/entities/client-phone.entity';
import { Recipient } from '../../orders/dispaches/packages/recipients/entities/recipient.entity';
import { Dispatch } from '../../orders/dispaches/entities/dispatch.entity';


export type ClientDocument = Client & Document

@Schema()
export class Client {

  @ApiProperty({ example: 'ID', description: 'ID клиента - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idCreator: User;

  @ApiProperty({ example: 'Дата первого контакта', description: 'Date' })
  @Prop({ type: Date, default: Date.now() })
  enterDate: Date

  @ApiProperty({ example: 'Ivan', description: 'имя клиента' })
  @Prop({ required: true, type: String })
  name: string;

  @ApiProperty({ example: '093********', description: 'телефон клиента' })
  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'ClientPhone'}], minlength: 10 })
  phones: ClientPhone[];

  @ApiProperty({ example: 'Instagram - Ivan8768', description: 'канал входа, мессенджер клиента, ник клиента, комментарий' })
  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'ClientChannel'}] })
  channels: ClientChannel[];

  @ApiProperty({ example: 'ID заказа', description: 'все заказы клиента' })
  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}] })
  orders: [string];


  @ApiProperty({ example: 'ID получателя', description: 'все получатели клиента' })
  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipient'}] })
  recipients: Recipient[];

  @ApiProperty({ example: 'очень нудный, петляй сразу', description: 'комментарий, описание' })
  @Prop({ type: String })
  desc: string
}

export const ClientSchema = SchemaFactory.createForClass(Client)
