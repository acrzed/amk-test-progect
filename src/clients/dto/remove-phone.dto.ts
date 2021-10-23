import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Length } from 'class-validator';
import * as mongoose from 'mongoose';
import { User } from '../../users/user.model';
import { Client } from '../entities/client.entity';

export class RemovePhoneDto {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Length(24, 24, {message: 'требуется ID пользователя удаляющего телефон, длинной 24 символа'})
  readonly idCreator: User;

  @ApiProperty({ example: 'ClientID', description: 'ClientID - ID клиента' })
  @Length(24, 24, {message: 'требуется ID клиента, телефон которого удаляют, длинной 24 символа'})
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client'})
  readonly idClient: Client;

  @ApiProperty({ example: '093********', description: 'телефон клиента' })
  @Length(10,10, {message:'требуется номер телефона вида 098*******, 10 цифр'})
  @Prop({ require: true, minlength: 10 })
  readonly phone: number;

  @ApiProperty({ example: 'комментарий', description: 'причина, заметки, описание' })
  @Length(5, 600, {message: 'требуется комментарий - причина удаления'})
  @Prop({ require: true, type: String })
  readonly desc: string
}
