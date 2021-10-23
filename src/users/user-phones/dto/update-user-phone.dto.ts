import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { Prop } from '@nestjs/mongoose';
import { AddUserPhoneDto } from './add-user-phone.dto';

export class UpdateUserPhoneDto extends PartialType(AddUserPhoneDto) {

  @ApiProperty({ example: '093********', description: 'телефон клиента' })
  @Length(10,15, {message:'требуется номер телефона вида 098*******, 10 цифр'})
  @Prop({ minlength: 10 })
  readonly phone: string;

  @ApiProperty({ example: '093********', description: 'телефон клиента' })
  @Prop({ minlength: 10 })
  readonly upPhone: string;

  @ApiProperty({example:'заметки', description:'заметки, комментарии'})
  @Prop({ type: String })
  readonly upDesc: string;
}
