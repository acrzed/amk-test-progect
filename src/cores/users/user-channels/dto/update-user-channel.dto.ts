import { PartialType } from '@nestjs/mapped-types';
import { AddUserChannelDto } from './add-user-channel.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';


export class UpdateUserChannelDto extends PartialType(AddUserChannelDto) {

  @ApiProperty({example: 'Канал', description: 'Название канала - инстаграм, вайбер и т.д.'})
  @Prop({required: true, type: String, minlength: 5})
  channel: string

  @ApiProperty({example: 'Nickname', description: 'ник'})
  @Prop({required: true, type: String, minLength: 5})
  nick: string

  @ApiProperty({example:'заметки', description:'заметки, комментарии'})
  @Prop({ type: String })
  desc: string;}
