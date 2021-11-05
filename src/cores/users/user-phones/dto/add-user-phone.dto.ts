import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Length } from 'class-validator';
import * as mongoose from 'mongoose';
import { User } from '../../user.model';
import { ObjectId } from 'mongoose';

export class AddUserPhoneDto {

  @ApiProperty({ example: 'User Phone ID', description: 'User Phone ID - ID пользователя' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  readonly idUser: User;

  @ApiProperty({ example: '093********', description: 'телефон клиента' })
  @Length(10,15, {message:'требуется номер телефона вида 098*******, 10 цифр'})
  @Prop({ minlength: 10 })
  readonly phone: string;

  @ApiProperty({example:'заметки', description:'заметки, комментарии'})
  @Prop({ type: String })
  readonly desc: string;
}
