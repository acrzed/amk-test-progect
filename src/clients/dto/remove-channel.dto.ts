import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Length } from 'class-validator';
import * as mongoose from 'mongoose';
import { User } from '../../users/user.model';
import { Client } from '../entities/client.entity';
import { Channel } from '../entities/channel.entity';

export class RemoveChannelDto {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Length(24, 24, {message: 'требуется ID пользователя удаляющего канал клиента, длинной 24 символа'})
  readonly idCreator: User;

  @ApiProperty({ example: 'ClientID', description: 'ClientID - ID клиента' })
  @Length(24, 24, {message: 'требуется ID клиента, канал которого удаляют, длинной 24 символа'})
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client'})
  readonly idClient: Client;

  @ApiProperty({ example: 'Channel ID', description: 'Channel ID - ID канала клиента' })
  @Length(24, 24, {message: 'требуется ID канала клиента, который удаляют, длинной 24 символа'})
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'Channel'})
  readonly idChannel: Channel;

  @ApiProperty({ example: 'комментарий', description: 'причина, заметки, описание' })
  @Length(5, 600, {message: 'требуется комментарий - причина удаления'})
  @Prop({ require: true, type: String })
  readonly desc: string
}
