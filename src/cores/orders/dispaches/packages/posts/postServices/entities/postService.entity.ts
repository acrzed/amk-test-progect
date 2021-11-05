import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';



export type PostServiceDocument = PostService & Document;

@Schema()
export class PostService {

  @ApiProperty({ example: 'ID', description: 'ID order - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Адреса-Адреса', description: 'способ доставки' })
  @Prop({ required: true, type: String, unique: true })
  service: string;

  @ApiProperty({ example: 'DoorsDoors', description: 'API NP способ доставки' })
  @Prop({ type: String, unique: true })
  ref: string;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  desc: string
}

export const PostServiceSchema = SchemaFactory.createForClass(PostService);

