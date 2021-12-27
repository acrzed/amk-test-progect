import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../../users/user.model';
import { City } from '../cities/entities/city.entity';
import { PostSrv } from '../posts/entities/postSrv.entity';
import { Order } from '../../entities/order.entity';
import { Recipient } from '../recipients/entities/recipient.entity';
import { PostService } from '../posts/postServices/entities/postService.entity';
import { IsNotEmpty } from 'class-validator';

export type PackageDocument = Package & Document;

@Schema()
export class Package {

  @ApiProperty({ example: 'ID', description: 'ID order - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'UserID', description: 'UserID - ' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @IsNotEmpty({ message: 'ID создателя заказа не может быть пустым!'})
  idCreator: User;

  @ApiProperty({example:'OrderID', description:'ID заказа'})
  @IsNotEmpty({ message: 'ID заказа не может быть пустым!'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  idOrder: Order

  @ApiProperty({example:'RecipientID', description:'ID получателя заказа'})
  @IsNotEmpty({ message: 'ID получателя заказа не может быть пустым!'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Recipient' })
  idRecipient: Recipient

  @ApiProperty({example:'API NP Sender', description:'отправитель API NP'})
  @Prop({ type: {} })
  sender: {}

  @ApiProperty({example:'CityID', description:'Город получателя'})
  @IsNotEmpty({ message: 'ID города получателя заказа не может быть пустым!'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'City' })
  idCity: City

  @ApiProperty({example:'PostID', description:'Отправлено почтой'})
  @IsNotEmpty({ message: 'ID почты не может быть пустым!'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: '619908baa0acdd144431e36a'})
  disPost: PostSrv

  @ApiProperty({example:'136', description:'отделение почты получателя - номер'})
  // @IsNotEmpty({ message: 'отделение почты получателя не может быть пустым!'})
  // @IsNumber()
  @Prop({ required: true, type: Number })
  postNumber: number

  @ApiProperty({example:'Отделение -  Отделение', description:'Тип доставки: отделение-отделение, отделение-адрес'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'PostService', default: '617f002ace2a8f3554ba2e89'})
  @IsNotEmpty({ message: 'Тип доставки не может быть пустым!'})
  disType: PostService

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
  @Prop({ type: Number, default: 200 })
  estimated: number

  @ApiProperty({example:'0.05', description:'объемный вес'})
  @Prop({ type: String })
  volumeWeight: string

  @ApiProperty({example:'0.05', description:'объем'})
  @Prop({ type: String })
  volume: string

  @ApiProperty({example:'17', description:'длина'})
  @Prop({ type: String })
  length: string

  @ApiProperty({example:'12', description:'ширина'})
  @Prop({ type: String })
  width : string

  @ApiProperty({example:'1', description:'высота'})
  @Prop({ type: String })
  height: string

  @ApiProperty({example:'Bayblade Set', description:'описание'})
  @IsNotEmpty({ message: 'описание заказа не может быть пустым!'})
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

