import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Client } from '../entities/client.entity';
import * as mongoose from 'mongoose';

export class AddChannelDto {
  @ApiProperty({example:'ID', description:'ID клиента'})
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  readonly idClient: Client
  @ApiProperty({example:'Instagram', description:'канал входа, мессенджер клиента'})
  @Prop({ require:true, type: String, default:'Instagram' })
  readonly channel: string
  @ApiProperty({ example:'Ivan98798', description:'ник клиента'})
  @Prop({ require: true, type: String })
  readonly nik: string;
  @ApiProperty({example:'заметки', description:'комментарий'})
  @Prop({ type: String })
  readonly desc: string;
}
