import { PartialType } from '@nestjs/mapped-types';
import { CreateChannelNameDto } from './create-channel-name.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

export class UpdateChannelNameDto extends PartialType(CreateChannelNameDto) {

  @ApiProperty({example:'Instagram', description:'название канала - инстаграм, телеграм, мейл, пр.'})
  @Prop({require:true, unique: true, type: String, default:'USER'})
  name: string

  @ApiProperty({example:'заметки', description:'описание'})
  @Prop({ require: true, type: String })
  description: string;
}
