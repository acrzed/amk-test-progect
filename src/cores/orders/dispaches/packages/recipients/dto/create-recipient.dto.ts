import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { User } from '../../../../../users/user.model';
import { Client } from '../../../../../clients/entities/client.entity';
import { IsNumber, Length } from 'class-validator';
import { Prop } from '@nestjs/mongoose';

export class CreateRecipientDto {
  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  readonly idCreator: User;

  @ApiProperty({example:'ClientID', description:'ID клиента'})
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  readonly idClient: Client

  @ApiProperty({example:'API NP Sender', description:'отправитель API NP'})
  @Prop({ type: String, default: 'SenderZed' })
  readonly sender: string

  @ApiProperty({example:'Данилова', description:'Фамилия получателя'})
  @Length(2,20, {message:'требуется lastName: Фамилия получателя'})
  @Prop({ required: true, type: String })
  readonly lastName: string

  @ApiProperty({example:'Марьяна', description:'Имя получателя'})
  @Length(2,20, {message:'требуется name: Имя получателя'})
  @Prop({ required: true, type: String })
  readonly name: string

  @ApiProperty({example:'Александровна', description:'Отчество получателя'})
  @Length(2,20, {message:'требуется middleName: Отчество получателя'})
  @Prop({ type: String })
  readonly middleName: string

  @ApiProperty({ example: '093********', description: 'телефон получателя' })
  @IsNumber()
  //@Length(10,10, {message:'требуется phone: номер телефона вида 098*******, 10 цифр'})
  @Prop({ required: true, type: Number, minlength: 10, maxlength: 10 })
  readonly phone: number;

  @ApiProperty({ example: '01.01.2021', description: 'Дата создания' })
  @Prop({ type: Date, default: Date.now() })
  readonly enterDate: Date

  @ApiProperty({ example: 'комментарий', description: 'комментарий, заметки, описание' })
  @Prop({ type: String })
  readonly desc: string
}
