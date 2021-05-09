import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export type CategoryMaterialDocument = CategoryMaterial & Document

@Schema()
export class CategoryMaterial {
  @ApiProperty({ example: 'ID категории', description: 'ID категории - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;
  @ApiProperty({ example: 'ткань', description: 'категория материала' })
  @Prop({ require: true, unique: true, type: String })
  name: string;
  @ApiProperty({ example: 'описание, детали', description: '' })
  @Prop({ type: String })
  note: string;
}

export const CategoryMaterialSchema = SchemaFactory.createForClass(CategoryMaterial);
