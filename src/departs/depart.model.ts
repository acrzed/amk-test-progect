import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type DepartDocument = Depart & Document

@Schema()
export class Depart {
  @ApiProperty({ example: 'ID', description: 'ID подразделения - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;
  @ApiProperty({example: 'Sellers', description: 'Название отдела - продажи, производство, технический, административный и т.д.'})
  @Prop({require:true, unique: true, type: String})
  name: string
  @ApiProperty({example:'Отдел продаж', description:'описание отдела - допуск, ограничение, etc.'})
  @Prop({ type: String })
  desc: string;
}

export  const DepartSchema = SchemaFactory.createForClass(Depart);
