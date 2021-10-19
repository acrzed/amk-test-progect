import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { User } from '../../users/user.model';
import { Client } from '../../clients/entities/client.entity';
import * as mongoose from 'mongoose';

export class CreateOrderDto {
  @ApiProperty({ example: 'ID', description: 'ID order - автоматически' })
  readonly _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  readonly idCreator: User;

  @ApiProperty({example:'ID', description:'ID клиента'})
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  readonly idClient: Client

  @ApiProperty({ example: 'заказ', description: 'содержимое заказа' })
  @Prop({ require: true, type: String })
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
  @Prop({ require: true, type: Number })
  readonly orderSum: number;

  @ApiProperty({ example: 'Скидка', description: 'скидка в сумме' })
  @Prop({ type: Number })
  readonly orderSale: number;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  readonly desc: string
}
