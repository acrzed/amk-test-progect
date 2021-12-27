import { Prop,  } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostServiceDto {


  @IsNotEmpty({ message: 'Название не может быть пустым!'})
  @IsString({message:'должно быть строкой'})
  @ApiProperty({ example: 'отделение-отделение', description: 'способ доставки' })
  @Prop({ required: true, type: String, unique: true })
  readonly service: string;

  @IsNotEmpty({ message: 'REF не может быть пустым!'})
  @IsString({message:'REF должен быть строкой'})
  @ApiProperty({ example: 'DoorsDoors', description: 'API NP способ доставки' })
  @Prop({ type: String, unique: true })
  readonly ref: string;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  readonly desc: string
}
