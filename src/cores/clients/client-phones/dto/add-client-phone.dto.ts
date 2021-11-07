import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Length } from 'class-validator';
import * as mongoose from 'mongoose';
import { Client } from '../../entities/client.entity';

export class AddClientPhoneDto {

  @ApiProperty({ example: 'Client Phone ID', description: 'Client Phone ID - ID клиента' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  readonly idClient: Client;

  @ApiProperty({ example: '093********', description: 'телефон клиента' })
  @Length(10,15, {message:'требуется номер телефона вида 098*******, 10 цифр'})
  @Prop({ required: true, minlength: 10 })
  readonly phone: string;

  @ApiProperty({example:'заметки', description:'заметки, комментарии'})
  @Prop({ type: String })
  readonly desc: string;
}
