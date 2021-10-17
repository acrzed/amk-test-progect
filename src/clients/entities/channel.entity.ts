import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from './client.entity';
import * as mongoose from 'mongoose';

export type ChannelDocument = Channel & Document

@Schema()
export class Channel {
  @ApiProperty({example:'ID', description:'ID клиента'})
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  idClient: Client
  @ApiProperty({example:'Instagram', description:'канал входа, мессенджер клиента'})
  @Prop({ require:true, type: String, default:'Instagram' })
  channel: string
  @ApiProperty({ example:'Ivan98798', description:'ник клиента'})
  @Prop({ require: true, type: String })
  nik: string;
  @ApiProperty({example:'заметки', description:'комментарий'})
  @Prop({ type: String })
  desc: string;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
