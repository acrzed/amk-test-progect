import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Length } from 'class-validator';
export class CreateClientDto {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ require: true})
  readonly idCreator: string;

  @ApiProperty({ example: '093********', description: 'телефон клиента' })
  @Length(10,10, {message:'требуется номер телефона вида 098*******, 10 цифр'})
  @Prop({ type: Number, minlength: 10 })
  readonly phone: [number];

  @ApiProperty({ example: 'Ivan', description: 'имя клиента' })
  @Prop({ type: String })

  readonly name: string;
  @ApiProperty({ example: 'очень нудный, петляй сразу', description: 'комментарий, описание' })
  @Prop({ type: String })
  readonly desc: string
}
