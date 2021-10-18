import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from '../../users/user.model';
import { Role } from '../../roles/roles.model';
import { Depart } from '../../departs/depart.model';
import { Order } from '../../orders/entities/order.entity';
import { Client } from './client.entity';
import { Channel } from './channel.entity';
import { Length } from 'class-validator';

export type TrashDocument = Trash & Document

@Schema()
export class Trash {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idCreator: User;

  @ApiProperty({ example: 'Дата удаления', description: 'Date' })
  @Prop({ type: Date, default: Date.now() })
  removeDate: Date;

  @ApiProperty({ example: 'User ID', description: 'UserID - ID пользователя' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idUser: User;

  @ApiProperty({ example: 'Role ID', description: 'Role ID - ID роли' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  idRole: Role;

  @ApiProperty({ example: 'Depart ID', description: 'Depart ID - ID отдела' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Depart' })
  idDepart: Depart;

  @ApiProperty({example:'Phone', description:'телефон'})
  @Prop({ type: String })
  phone: string;

  @ApiProperty({example:'Client ID', description:'ID клиента'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  idClient: Client;

  @ApiProperty({example:'Channel ID', description:'ID канала'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' })
  idChannel: Channel;

  @ApiProperty({example:'Order ID', description:'ID заказа'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  idOrder: Order;

  @ApiProperty({example:'Тело заказа', description:'содержимое заказа'})
  @Prop({ type: String })
  basket: string;

  // @ApiProperty({example:'Pay ID', description:'ID оплаты'})
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pay' })
  // idChannel: Pay;

  @ApiProperty({example:'заметки', description:'комментарий'})
  @Prop({ require: true, type: String })
  desc: string;
}

export const TrashSchema = SchemaFactory.createForClass(Trash);
