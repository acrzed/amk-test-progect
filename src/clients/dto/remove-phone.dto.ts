import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Length } from 'class-validator';

export class RemovePhoneDto {
  @ApiProperty({ example: 'ClientID', description: 'ClientID - ID клиента' })
  @Prop({ require: true})
  readonly idClient: string;
  @ApiProperty({ example: '093********', description: 'телефон клиента' })
  @Length(10,10, {message:'требуется номер телефона вида 098*******, 10 цифр'})
  @Prop({ minlength: 10 })
  readonly phone: number;
}
