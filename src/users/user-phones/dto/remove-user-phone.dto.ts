import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Length } from 'class-validator';
import * as mongoose from 'mongoose';
import { User } from '../../user.model';
import { UserPhone } from '../entities/user-phone.entity';
import { ObjectId } from 'mongoose';

export class RemoveUserPhoneDto {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Length(24, 24, {message: 'требуется ID пользователя удаляющего телефон, длинной 24 символа'})
  readonly idCreator: ObjectId;

  @ApiProperty({ example: 'RemoveUserPhoneID', description: 'RemoveUserID - ID телефона который удаляют' })
  //@Length(24, 24, {message: 'требуется ID телефона который удаляют, длинной 24 символа'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserPhone' })
  readonly idRemoveUserPhone: ObjectId;

  @ApiProperty({ example: '093********', description: 'телефон клиента' })
  //@Length(10,10, {message:'требуется номер телефона вида 098*******, 10 цифр'})
  @Prop({ minlength: 10 })
  readonly phone: string;

  @ApiProperty({ example: 'комментарий', description: 'причина, заметки, описание' })
  @Length(5, 600, {message: 'требуется комментарий - причина удаления'})
  @Prop({ require: true, type: String })
  readonly desc: string
}
