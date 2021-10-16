import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';


export type DeptDocument = Dept & Document

@Schema()
export class Dept {
  @ApiProperty({ example: 'ID', description: 'ID подразделения - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;
  @ApiProperty({example: 'Seller', description: 'Отдел - продажа, производство, технический, административный и т.д.'})
  @Prop({require:true, unique: true, type: String})
  value: string
  @ApiProperty({example:'Отдел продаж', description:'описание отдела - допуск, ограничение, etc.'})
  @Prop({ require: true, type: String })
  description: string;
}

export const DeptSchema = SchemaFactory.createForClass(Dept);
