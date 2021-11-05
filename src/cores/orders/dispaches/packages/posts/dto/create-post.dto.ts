import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {

  @ApiProperty({ example: 'Новая Почта', description: 'название почты' })
  @Prop({ required: true, type: String, unique: true })
  readonly post: string;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  readonly desc: string

}
