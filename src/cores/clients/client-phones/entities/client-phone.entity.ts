import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Client } from '../../entities/client.entity';

export type ClientPhoneDocument = ClientPhone & Document

@Schema()
export class ClientPhone {

  @ApiProperty({ example: 'ID Phone', description: 'ID номера телефона - автоматически' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'ClientID', description: 'ClientID - ID владельца номера телефона' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  idClient: Client;

  @ApiProperty({example: 'Номер телефона пользователя', description: 'Номер телефона пользователя'})
  @Prop({required:true, type: String})
  phone: number

  @ApiProperty({example:'заметки', description:'заметки, комментарии'})
  @Prop({ type: String })
  desc: string;

}

export const ClientPhoneSchema = SchemaFactory.createForClass(ClientPhone)

