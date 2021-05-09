import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export type MaterialDocument = Material & Document

@Schema()
export class Material {
  @ApiProperty({ example: 'ID категории', description: 'ID категории - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;
  @ApiProperty({ example: 'лён, флис и т.д.', description: 'название материала' })
  @Prop({ require: true, unique: true, type: String })
  name: string;
  @ApiProperty({ example: 'ткань', description: 'категория материала - cсылка' })
  @Prop({ ref: 'catmats' })
  category: string;
  @ApiProperty({ example: 'описание, детали', description: '' })
  @Prop({ type: String })
  note: string;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
