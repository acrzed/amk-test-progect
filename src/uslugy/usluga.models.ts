import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export type UslugaDocument = Usluga & Document

@Schema()
export class Usluga {
  @ApiProperty({ example: 'ID категории', description: 'ID категории - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;
  @ApiProperty({ example: 'BOLT, НП, прочее...', description: 'название услуги' })
  @Prop({ require: true, unique: true, type: String })
  name: string;
  @ApiProperty({ example: 'такси, почта, прочее', description: 'категория услуги - cсылка' })
  @Prop({ ref: 'catmats' })
  category: string;
  @ApiProperty({ example: 'описание, детали', description: '' })
  @Prop({ type: String })
  note: string;
}

export const UslugySchema = SchemaFactory.createForClass(Usluga);
