import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Length } from 'class-validator';
import * as mongoose from 'mongoose';
import { ObjectId } from 'mongoose';
import { Client } from '../../entities/client.entity';

export class AddClientChannelDto {

  @ApiProperty({ example: 'ClientID', description: 'ClientID - ID клиента, владельца канала' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  readonly idClient: Client;

  @ApiProperty({example: 'Канал', description: 'Название канала - инстаграм, вайбер и т.д.'})
  @Prop({required: true, type: String, minlength: 5, default: 'Instagram' })
  readonly channel: string

  @ApiProperty({example: 'Nickname', description: 'ник'})
  @Prop({required: true, type: String, minLength: 5})
  readonly nick: string

  @ApiProperty({example:'заметки', description:'заметки, комментарии'})
  @Prop({ type: String })
  readonly desc: string;
}
