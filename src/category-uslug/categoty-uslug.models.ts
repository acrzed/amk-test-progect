import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export type CategoryUslugDocument = CategoryUslug & Document

@Schema()
export class CategoryUslug {
  @ApiProperty({ example: 'ID категории', description: 'ID категории - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;
  @ApiProperty({ example: 'такси', description: 'категория услуг' })
  @Prop({ require: true, unique: true, type: String })
  name: string;
  @ApiProperty({ example: '', description: 'описание, детали' })
  @Prop({ type: String })
  note: string;
}

export const CategoryUslugSchema = SchemaFactory.createForClass(CategoryUslug);
