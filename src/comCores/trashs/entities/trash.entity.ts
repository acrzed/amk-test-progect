import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from '../../../cores/users/user.model';
import { Role } from '../../roles/roles.model';
import { Depart } from '../../../cores/users/departs/depart.model';
import { Order } from '../../../cores/orders/entities/order.entity';
import { Client } from '../../../cores/clients/entities/client.entity';
import { UserPhone } from '../../../cores/users/user-phones/entities/user-phone.entity';
import { UserChannel } from '../../../cores/users/user-channels/entities/user-channel.entity';
import { ChannelName } from '../../channel-names/entities/channel-name.entity';
import { ClientChannel } from '../../../cores/clients/client-channels/entities/client-channel.entity';
import { ClientPhone } from '../../../cores/clients/client-phones/entities/client-phone.entity';
import { Pay } from '../../../cores/orders/pays/entities/pay.entity';
import { Dispatch } from '../../../cores/orders/dispaches/entities/dispatch.entity';
import { Recipient } from '../../../cores/orders/dispaches/packages/recipients/entities/recipient.entity';

export type TrashDocument = Trash & Document

@Schema()
export class Trash {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idCreator: string;

  @ApiProperty({ example: 'Дата удаления', description: 'Date' })
  @Prop({ type: Date, default: Date.now() })
  removeDate: Date;

  @ApiProperty({ example: 'User', description: 'пользователь' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idUser: User;

  @ApiProperty({ example: 'Role ID', description: 'Role ID - ID роли' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  idRole: Role;

  @ApiProperty({ example: 'Role', description: 'роль' })
  @Prop()
  role: string;

  @ApiProperty({ example: 'Depart', description: 'отдел' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Depart' })
  idDepart: Depart;

  @ApiProperty({example:'ChannelName', description:'Название канала'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ChannelName' })
  idChannelName: ChannelName;

  @ApiProperty({example:'Channel ', description:'Название канала'})
  @Prop({ type: String })
  channel: string;

  @ApiProperty({example:'UserChannel', description:'канал пользователя'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserChannel' })
  idUserChannel: UserChannel;

  @ApiProperty({example:'Nick', description:'ник'})
  @Prop({ type: String })
  nick: string;

  @ApiProperty({example:'UserPhone', description:'телефон пользователя'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserPhone' })
  idUserPhone: UserPhone;

  @ApiProperty({example:'Phone', description:'телефон'})
  @Prop({ type: String })
  phone: number;

  @ApiProperty({example:'Client', description:'клиент'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  idClient: Client;

  // @ApiProperty({example:'ClientPhone ID', description:'ID телефона пользователя'})
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Phone' })
  // idPhone: Phone;

  @ApiProperty({example:'ClientChannel', description:'канал клиента'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ClientChannel' })
  idClientChannel: ClientChannel;

  @ApiProperty({example:'ClientPhone', description:'телефон клиента'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ClientPhone' })
  idClientPhone: ClientPhone;

  @ApiProperty({example:'Заказ', description:'заказ'})
  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' } })
  order: Order;

  @ApiProperty({ example: 'Оплата', description: 'оплата' })
  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pay'}] })
  pay: Pay;

  @ApiProperty({ example: 'ID оплаты', description: 'все получатели клиента' })
  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dispatch'}] })
  dispatchs: Dispatch;

  @ApiProperty({ example: 'ID получателя', description: 'все получатели клиента' })
  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipient'}] })
  recipients: Recipient;

  @ApiProperty({example:'Тело заказа', description:'содержимое заказа'})
  @Prop({ type: String })
  basket: string;

  // @ApiProperty({example:'Pay ID', description:'ID оплаты'})
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pay' })
  // idChannel: Pay;

  @ApiProperty({example:'заметки', description:'комментарий'})
  @Prop({ required: true, type: String })
  desc: string;

  @ApiProperty({example:'Количество удалённых записей корзины', description:''})
  @Prop({ type: Number })
  countTrash: number;
}

export const TrashSchema = SchemaFactory.createForClass(Trash);
