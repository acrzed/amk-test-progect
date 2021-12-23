import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderTypeDto {

  @ApiProperty({ example: 'тип заказа', description: 'заказ, обмен, возврат' })
  @IsNotEmpty({ message: 'тип заказа не может быть пустым!'})
  @IsString({message:'тип заказа должен быть строкой'})
  @Prop({ required: true, type: String, unique: true })
  readonly orderType: string;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  readonly desc: string
}
