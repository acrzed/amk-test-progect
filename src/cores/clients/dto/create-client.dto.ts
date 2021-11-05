import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { User } from '../../users/user.model';
export class CreateClientDto {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ required: true})
  readonly idCreator: User;

  @ApiProperty({ example: 'Ivan', description: 'имя клиента' })
  @Prop({ required: true, type: String })
  readonly name: string;

  @ApiProperty({ example: '093********', description: 'телефон клиента' })
  @Prop({ required: true,type: String, minlength: 10 })
  readonly phone: string;

  @ApiProperty({ example: 'Instagram', description: 'канал клиента' })
  @Prop({ required: true, type: String, default: 'Instagram' })
  readonly channel: string;

  @ApiProperty({ example: 'ivan_798', description: 'ник клиента' })
  @Prop({ required: true, type: String })
  readonly nick: string;

  @ApiProperty({ example: 'очень нудный, петляй сразу', description: 'комментарий, описание' })
  @Prop({ type: String })
  readonly desc: string
}
