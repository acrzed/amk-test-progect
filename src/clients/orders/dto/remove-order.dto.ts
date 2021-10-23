import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Length } from 'class-validator';
import * as mongoose from 'mongoose';
import { Order } from '../entities/order.entity';
import { User } from '../../../users/user.model';


export class RemoveOrderDto {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Length(24, 24, {message: 'требуется ID пользователя удаляющего заказ клиента, длинной 24 символа'})
  readonly idCreator: User;

  @ApiProperty({example:'ID', description:'ID заказа'})
  @Length(24, 24, {message: 'требуется ID заказа клиента, который удаляют, длинной 24 символа'})
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  readonly idOrder: Order

  @ApiProperty({ example: 'комментарий', description: 'причина, заметки, описание' })
  @Length(5, 600, {message: 'требуется комментарий - причина удаления'})
  @Prop({ require: true, type: String })
  readonly desc: string
}
