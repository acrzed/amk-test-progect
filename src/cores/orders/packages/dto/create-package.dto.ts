import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsEmpty, IsNotEmpty } from 'class-validator';
import { User } from '../../../users/user.model';
import { Order } from '../../entities/order.entity';
import { Recipient } from '../recipients/entities/recipient.entity';
import { City } from '../cities/entities/city.entity';
import { PostSrv } from '../posts/entities/postSrv.entity';
import { PostService } from '../posts/postServices/entities/postService.entity';

export class CreatePackageDto {

  @ApiProperty({ example: 'UserID', description: 'UserID - ' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @IsEmpty({ message: 'ID создателя заказа не может быть пустым!'})
  readonly idCreator: User;

  @ApiProperty({example:'OrderID', description:'ID заказа'})
  @IsEmpty({ message: 'ID заказа заказа не может быть пустым!'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  readonly idOrder: Order

  @ApiProperty({example:'RecipientID', description:'ID получателя заказа'})
  @IsEmpty({ message: 'ID получателя заказа не может быть пустым!'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Recipient' })
  readonly idRecipient: Recipient

  @ApiProperty({example:'API NP Sender', description:'отправитель API NP'})
  @Prop({ type: {} })
  readonly sender: {}

  @ApiProperty({example:'CityID', description:'Город получателя'})
  @IsEmpty({ message: 'ID города получателя заказа не может быть пустым!'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'City' })
  readonly idCity: City

  @ApiProperty({example:'PostID', description:'Отправлено почтой'})
  @IsEmpty({ message: 'ID почты не может быть пустым!'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: '619908baa0acdd144431e36a'})
  readonly disPost: PostSrv

  @ApiProperty({example:'136', description:'отделение почты получателя - номер'})
  // @IsNotEmpty({ message: 'отделение почты получателя не может быть пустым!'})
  @Prop({ required: true, type: Number })
  readonly postNumber: number

  @ApiProperty({example:'Отделение -  Отделение', description:'Тип доставки: отделение-отделение, отделение-адрес'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'PostService', default: '617f002ace2a8f3554ba2e89'})
  readonly disType: PostService

  @ApiProperty({example:'false', description:'доставку оплачивает - клиент (false) - мы (true)'})
  @Prop({ required: true, type: Boolean, default: false })
  readonly ourDelivery: boolean

  @ApiProperty({ example: '57', description: 'Цена доставки' })
  @Prop({ type: Number })
  readonly disSum: number;

  @ApiProperty({example:'1030', description:'сумма наложенного платежа'})
  @Prop({ type: Number })
  readonly codSum: number

  @ApiProperty({example:'200', description:'оценочная стоимость'})
  @Prop({ type: Number, default: 200 })
  readonly estimated: number

  @ApiProperty({example:'0.05', description:'объемный вес'})
  @Prop({ type: String })
  readonly volumeWeight: string

  @ApiProperty({example:'0.05', description:'объем'})
  @Prop({ type: String })
  readonly volume: string

  @ApiProperty({example:'17', description:'длина'})
  @Prop({ type: String })
  readonly length: string

  @ApiProperty({example:'12', description:'ширина'})
  @Prop({ type: String })
  readonly width : string

  @ApiProperty({example:'1', description:'высота'})
  @Prop({ type: String })
  readonly height: string

  @ApiProperty({example:'Bayblade Set', description:'описание'})
  @IsEmpty({ message: 'описание заказа не может быть пустым!'})
  @Prop({ required: true, type: String })
  readonly depiction: string

  @ApiProperty({ example: '01.01.2021', description: 'Дата создания' })
  @Prop({ type: Date, default: Date.now() })
  readonly enterDate: Date

  @ApiProperty({ example: '01.01.2021', description: 'Ожидаемая дата доставки' })
  @Prop({ type: Date })
  readonly expectedDate: Date

  @ApiProperty({example:'TTN', description:'номер ТТН'})
  @Prop({ type: Number })
  readonly ttn: number


  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  readonly desc: string
}
