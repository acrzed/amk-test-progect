import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../../../users/user.model';
import { City } from '../cities/entities/city.entity';
import { Post } from '../posts/entities/post.entity';
import { OrderType } from '../../../order-types/entities/order-type.entity';
import { Order } from '../../../entities/order.entity';
import { Recipient } from '../recipients/entities/recipient.entity';

export type PackageDocument = Package & Document;

@Schema()
export class Package {

  @ApiProperty({ example: 'ID', description: 'ID order - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idCreator: User;

  @ApiProperty({example:'OrderID', description:'ID заказа'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  idOrder: Order

  @ApiProperty({example:'OrderID', description:'ID заказа'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Recipient' })
  idRecipient: Recipient

  @ApiProperty({example:'API NP Sender', description:'отправитель API NP'})
  @Prop({ type: {} })
  sender: {}

  @ApiProperty({example:'Одесса', description:'Город получателя'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'City' })
  city: City

  @ApiProperty({example:'УкрПочта', description:'Отправлено почтой'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: '617f04365a11b633446865e7'})
  disPost: Post

  @ApiProperty({example:'136', description:'отделение почты номер'})
  @Prop({ required: true, type: Number })
  postNumber: number

  @ApiProperty({example:'Отделение -  Отделение', description:'Тип доставки: отделение-отделение, отделение-адрес'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'OrderType', default: '617f002ace2a8f3554ba2e89'})
  disType: OrderType

  @ApiProperty({example:'false', description:'доставку оплачивает - клиент (false) - мы (true)'})
  @Prop({ required: true, type: Boolean, default: false })
  ourDelivery: boolean

  @ApiProperty({ example: '57', description: 'Цена доставки' })
  @Prop({ type: Number })
  disSum: number;

  @ApiProperty({example:'1030', description:'сумма наложенного платежа'})
  @Prop({ type: Number })
  codSum: number

  @ApiProperty({example:'200', description:'оценочная стоимость'})
  @Prop({ type: Number })
  estimated: number

  @ApiProperty({example:'0.05', description:'объемный вес'})
  @Prop({ required: true, type: String })
  volumeWeight: string

  @ApiProperty({example:'0.05', description:'объем'})
  @Prop({ required: true, type: String })
  volume: string

  @ApiProperty({example:'17', description:'длина'})
  @Prop({ required: true, type: String })
  length: string

  @ApiProperty({example:'12', description:'ширина'})
  @Prop({ required: true, type: String })
  width : string

  @ApiProperty({example:'1', description:'высота'})
  @Prop({ required: true, type: String })
  height: string

  @ApiProperty({example:'Bayblade Set', description:'описание'})
  @Prop({ required: true, type: String })
  depiction: string

  @ApiProperty({ example: '01.01.2021', description: 'Дата создания' })
  @Prop({ type: Date, default: Date.now() })
  enterDate: Date

  @ApiProperty({ example: '01.01.2021', description: 'Ожидаемая дата доставки' })
  @Prop({ type: Date })
  expectedDate: Date

  @ApiProperty({example:'TTN', description:'номер ТТН'})
  @Prop({ type: Number })
  ttn: number


  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  desc: string
}

export const PackageSchema = SchemaFactory.createForClass(Package);

