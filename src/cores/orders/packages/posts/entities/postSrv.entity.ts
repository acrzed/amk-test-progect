import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';



export type PostSrvDocument = PostSrv & Document;

@Schema()
export class PostSrv {

  @ApiProperty({ example: 'ID', description: 'ID order - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Новая Почта', description: 'название почты' })
  @IsNotEmpty({ message: 'Название не может быть пустым!'})
  @IsString({message:'должно быть строкой'})
  @Prop({ required: true, type: String, unique: true })
  post: string;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  desc: string
}

export const PostSrvSchema = SchemaFactory.createForClass(PostSrv);
