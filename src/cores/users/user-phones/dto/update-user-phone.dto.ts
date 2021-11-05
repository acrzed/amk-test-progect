import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { AddUserPhoneDto } from './add-user-phone.dto';

export class UpdateUserPhoneDto extends PartialType(AddUserPhoneDto) {

  @ApiProperty({ example: '093********', description: 'телефон клиента' })
  @Prop({ minlength: 10 })
  readonly upPhone: string;

  @ApiProperty({example:'заметки', description:'заметки, комментарии'})
  @Prop({ type: String })
  readonly upDesc: string;
}
