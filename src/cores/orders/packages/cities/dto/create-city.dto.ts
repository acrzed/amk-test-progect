import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCityDto {

  @ApiProperty({ example: 'Одесса', description: 'город' })
  @IsNotEmpty({ message: 'Название города не может быть пустым!'})
  @IsString({message:'Название города должно быть строкой'})
  @Prop({ required: true, type: String, unique: true })
  readonly city: string;

  @ApiProperty({ example: '', description: 'API NP - REF города' })
  @Prop({ type: String, unique: true })
  readonly ref: string;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  readonly desc: string
}

