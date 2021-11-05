import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from '../../../users/user.model';
import { Client } from '../../../clients/entities/client.entity';
import { Order } from '../../entities/order.entity';


export type DispatchDocument = Dispatch & Document;

@Schema()
export class Dispatch {

  @ApiProperty({ example: 'ID', description: 'ID order - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idSender: User;

  @ApiProperty({example:'ID', description:'ID клиента'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  idClient: Client

  @ApiProperty({example:'OrderID', description:'ID заказа'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  idOrder: Order

  @ApiProperty({ example: '01.01.2021', description: 'дата и время обработки заказа' })
  @Prop({ type: Date, default: Date.now() })
  enterDate: Date

  @ApiProperty({ example: 'заказ', description: 'содержимое заказа' })
  @Prop({ required: true, type: String })
  basket: string;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  desc: string
}

export const DispatchSchema = SchemaFactory.createForClass(Dispatch);

