import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Client } from '../../entities/client.entity';

export type ClientChannelDocument = ClientChannel & Document

@Schema()
export class ClientChannel {

  @ApiProperty({ example: 'ID', description: 'ID канала - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'ClientID', description: 'ClientID - ID владельца номера канала' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  idClient: Client;

  @ApiProperty({example: 'Канал', description: 'Название канала - инстаграм, вайбер и т.д.'})
  @Prop({ required:true, type: String})
  channel: string

  @ApiProperty({example: 'Nickname', description: 'ник'})
  @Prop({ required:true, type: String})
  nick: string

  @ApiProperty({example: '', description: 'хеш канала и ника'})
  @Prop({ unique: true, type: String})
  hashChannel: string

  @ApiProperty({example:'заметки', description:'заметки, комментарии'})
  @Prop({ type: String })
  desc: string;

}

export const ClientChannelSchema = SchemaFactory.createForClass(ClientChannel)
