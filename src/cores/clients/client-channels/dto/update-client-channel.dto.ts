import { PartialType } from '@nestjs/mapped-types';
import { AddClientChannelDto } from './add-client-channel.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';


export class UpdateClientChannelDto extends PartialType(AddClientChannelDto) {

  @ApiProperty({example: 'Канал', description: 'Название канала - инстаграм, вайбер и т.д.'})
  @Prop({required: true, type: String, minlength: 5})
  channel: string

  @ApiProperty({example: 'Nickname', description: 'ник'})
  @Prop({required: true, type: String, minLength: 5})
  nick: string

  @ApiProperty({example:'заметки', description:'заметки, комментарии'})
  @Prop({ type: String })
  desc: string;}
