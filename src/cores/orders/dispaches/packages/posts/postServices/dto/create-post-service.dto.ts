import { Prop,  } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostServiceDto {

  @ApiProperty({ example: 'отделение-отделение', description: 'способ доставки' })
  @Prop({ required: true, type: String, unique: true })
  readonly service: string;

  @ApiProperty({ example: 'DoorsDoors', description: 'API NP способ доставки' })
  @Prop({ type: String, unique: true })
  readonly ref: string;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  readonly desc: string
}
