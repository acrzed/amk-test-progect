import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

export class CreateOrderStatDto {

  @ApiProperty({ example: 'состояние, статус заказа', description: 'принят - ожидание оплаты, оплачен - в обработке, в отправки, закрыт' })
  @Prop({ required: true, type: String, unique: true })
  readonly status: string;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  readonly desc: string
}
