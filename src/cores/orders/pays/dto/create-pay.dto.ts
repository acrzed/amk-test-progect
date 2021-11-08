import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../../users/user.model';
import { Client } from '../../../clients/entities/client.entity';
import { Order } from '../../entities/order.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePayDto {


  @ApiProperty({ example: 'Дата создания', description: 'Date' })
  @Prop({ type: Date, default: Date.now() })
  readonly createDate: Date

  @ApiProperty({ required: true, example: 'UserID', description: 'UserID - ID создателя' })
  @IsNotEmpty({ message: 'ID создателя не может быть пустым!'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  readonly idCreator: string;

  @ApiProperty({ required: true, example:'OrderID', description:'ID заказа'})
  @IsNotEmpty({ message: 'ID заказа не может быть пустым!'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  readonly idOrder: string

  @ApiProperty({ required: true, example: '01.01.2021', description: 'Дата оплаты' })
  @IsNotEmpty({ message: 'Дата оплаты не может быть пустой!'})
  @IsString({message:'Дата должна быть строкой - день, месяц, год - 23.12.2013'})
  @Prop({ type: String, required: true, message: 'Нужна дата оплаты' })
  readonly payDate: string

  @ApiProperty({ required: true, example: '18:21', description: 'Время оплаты' })
  @IsNotEmpty({ message: 'Время оплаты не может быть пустым!'})
  @IsString({message:'Время должно быть строкой - 12:23'})
  @Prop({ type: String })
  readonly payTime: string

  @ApiProperty({ required: true, example: '300', description: 'Сумма оплаты' })
  @IsNotEmpty({ message: 'Сумма оплаты не может быть пустой!'})
  @IsNumber()
  @Prop({ type: Number })
  readonly paySum: number;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  readonly desc: string
}
