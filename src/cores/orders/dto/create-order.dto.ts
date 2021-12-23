import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Client } from '../../clients/entities/client.entity';
import * as mongoose from 'mongoose';
import { User } from '../../users/user.model';
import { Length } from 'class-validator';

export class CreateOrderDto {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  readonly idCreator: User;

  @ApiProperty({example:'ID', description:'ID клиента'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  readonly idClient: Client

  @ApiProperty({ example: 'заказ', description: 'содержимое заказа' })
  @Length(10, 5000, {message: 'содержимое заказа'})
  @Prop({ required: true, type: String, minlength: 10 })
  readonly basket: string;

  @ApiProperty({ example: 'Цена заказа', description: 'сумма единиц заказа по стандартной цене' })
  @Prop({ required: true, type: Number, minlength: 3 })
  readonly orderSum: number;

  @ApiProperty({ example: 'индпошив', description: 'индпошив в заказе' })
  @Prop({ type: String })
  readonly indPosh: string;

  @ApiProperty({ example: 'Предположительная дата готовности индопошива', description: 'Date' })
  @Prop({ type: String })
  readonly indPoshDate: string

  @ApiProperty({ example: 'Цена индпошива', description: 'стоимость индпошива' })
  @Prop({ type: Number })
  readonly indPay: number;

  @ApiProperty({ example: 'Скидка', description: 'скидка в сумме' })
  @Prop({ type: Number })
  readonly orderSale: number;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  readonly desc: string
}
