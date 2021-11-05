import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Client } from '../entities/client.entity';

export class AddClientPhoneDto {

  @ApiProperty({ example: 'ClientID', description: 'ClientID - ID клиента' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client'})
  readonly idClient: Client;

  @ApiProperty({ example: '093********', description: 'телефон клиента' })
  @Prop({ required: true, minlength: 10 })
  readonly phone: string;
}
