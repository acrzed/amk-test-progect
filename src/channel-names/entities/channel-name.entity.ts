import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ChannelNameDocument = ChannelName & Document

@Schema()
export class ChannelName {

  @ApiProperty({example:'Instagram', description:'название канала - инстаграм, телеграм, мейл, пр.'})
  @Prop({require:true, unique: true, type: String, default:'USER'})
  name: string

  @ApiProperty({example:'заметки', description:'описание'})
  @Prop({ require: true, type: String })
  description: string;
}

export const ChannelNameSchema = SchemaFactory.createForClass(ChannelName);
