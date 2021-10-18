import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Client } from '../entities/client.entity';
import * as mongoose from 'mongoose';
import { User } from '../../users/user.model';
import { Length } from 'class-validator';

export class AddOrderDto {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Length(24, 24, {message: 'требуется ID пользователя создающего заказ, длинной 24 символа'})
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  readonly idCreator: User;

  @ApiProperty({example:'ID', description:'ID клиента'})
  @Length(24, 24, {message: 'требуется ID клиента, которому принадлежит заказ, длинной 24 символа'})
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  readonly idClient: Client

  @ApiProperty({ example: 'заказ', description: 'содержимое заказа' })
  @Length(10, 5000, {message: 'требуется комментарий - причина удаления'})
  @Prop({ require: true, type: String, minlength: 10 })
  readonly basket: string;

  @ApiProperty({ example: 'индпошив', description: 'индпошив в заказе' })
  @Prop({ type: String })
  readonly indPosh: string;

  @ApiProperty({ example: 'Предположительная дата готовности индопошива', description: 'Date' })
  @Prop({ type: String })
  readonly indPoshDate: string

  @ApiProperty({ example: 'Цена индпошива', description: 'стоимость индпошива' })
  @Prop({ type: Number })
  readonly indPay: number;

  @ApiProperty({ example: 'Цена заказа', description: 'цена содержимого заказа в сумме' })
  @Length(3, 5, {message: 'требуется указать цену заказа'})
  @Prop({ require: true, type: Number, minlength: 3 })
  readonly orderSum: number;

  @ApiProperty({ example: 'Скидка', description: 'скидка в сумме' })
  @Prop({ type: Number })
  readonly orderSale: number;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  readonly desc: string
}
