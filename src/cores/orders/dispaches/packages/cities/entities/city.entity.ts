
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';



export type CityDocument = City & Document;

@Schema()
export class City {

  @ApiProperty({ example: 'ID', description: 'ID order - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Одесса', description: 'город' })
  @Prop({ required: true, type: String, unique: true })
  city: string;

  @ApiProperty({ example: '', description: 'API NP города' })
  @Prop({ type: String, unique: true })
  ref: string;

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  desc: string
}

export const CitySchema = SchemaFactory.createForClass(City);
