import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from '../../users/user.model';
import { Role } from '../../roles/roles.model';
import { Depart } from '../../users/departs/depart.model';
import { Order } from '../../clients/orders/entities/order.entity';
import { Client } from '../../clients/entities/client.entity';
import { Channel } from '../../clients/entities/channel.entity';
import { UserPhone } from '../../users/user-phones/entities/user-phone.entity';

export type TrashDocument = Trash & Document

@Schema()
export class Trash {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idCreator: ObjectId;

  @ApiProperty({ example: 'Дата удаления', description: 'Date' })
  @Prop({ type: Date, default: Date.now() })
  removeDate: Date;

  @ApiProperty({ example: 'User ID', description: 'UserID - ID пользователя' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idUser: ObjectId;

  @ApiProperty({ example: 'Role ID', description: 'Role ID - ID роли' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  idRole: ObjectId;

  @ApiProperty({ example: 'Role', description: 'роль' })
  @Prop()
  role: string;

  @ApiProperty({ example: 'Depart ID', description: 'Depart ID - ID отдела' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Depart' })
  idDepart: ObjectId;

  @ApiProperty({example:'Channel ID', description:'ID канала'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ChannelName' })
  idChannelName: ObjectId;

  @ApiProperty({example:'Channel ', description:'Название канала'})
  @Prop({ type: String })
  channel: string;

  @ApiProperty({example:'Channel ID', description:'ID канала'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' })
  idUserChannel: ObjectId;

  @ApiProperty({example:'Nick', description:'ниик'})
  @Prop({ type: String })
  nick: string;

  @ApiProperty({example:'UserPhone ID', description:'ID телефона пользователя'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserPhone' })
  idUserPhone: ObjectId;

  @ApiProperty({example:'Phone', description:'телефон'})
  @Prop({ type: String })
  phone: string;

  @ApiProperty({example:'Client ID', description:'ID клиента'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  idClient: ObjectId;

  // @ApiProperty({example:'UserPhone ID', description:'ID телефона пользователя'})
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Phone' })
  // idPhone: Phone;

  @ApiProperty({example:'Channel ID', description:'ID канала'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' })
  idChannel: ObjectId;

  @ApiProperty({example:'Order ID', description:'ID заказа'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  idOrder: ObjectId;

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
