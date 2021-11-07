import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../../users/user.model';
import { Client } from '../../../clients/entities/client.entity';
import { Order } from '../../entities/order.entity';

export class CreatePayDto {


  @ApiProperty({ example: 'Дата создания', description: 'Date' })
  @Prop({ type: Date, default: Date.now() })
  readonly createDate: Date

  @ApiProperty({ required: true, example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  readonly idCreator: string;

  @ApiProperty({ required: true, example:'ClientID', description:'ID клиента'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  readonly idClient: string

  @ApiProperty({ required: true, example:'OrderID', description:'ID заказа'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  readonly idOrder: string

  @ApiProperty({ required: true, example: '01.01.2021', description: 'Дата оплаты' })
  @Prop({ type: String, required: true, message: 'Нужна дата оплаты' })
  readonly payDate: string

  @ApiProperty({ required: true, example: '18:21', description: 'Время оплаты' })
  @Prop({ type: String })
  readonly payTime: string

  @ApiProperty({ required: true, example: '300', description: 'Сумма оплаты' })
  @Prop({ type: Number })
  readonly paySum: number;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  readonly desc: string
}
