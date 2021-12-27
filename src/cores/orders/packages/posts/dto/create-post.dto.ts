import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {

  @ApiProperty({ example: 'Новая Почта', description: 'название почты' })
  @IsNotEmpty({ message: 'Название не может быть пустым!'})
  @IsString({message:'Название должно быть строкой'})
  @Prop({ required: true, type: String, unique: true })
  readonly post: string;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  readonly desc: string

}
