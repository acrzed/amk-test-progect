import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

export class CreateChannelNameDto {

  @ApiProperty({example:'Instagram', description:'название канала - инстаграм, телеграм, мейл, пр.'})
  @Prop({required:true, unique: true, type: String, default:'USER'})
  readonly name: string

  @ApiProperty({example:'заметки', description:'описание'})
  @Prop({ required: true, type: String })
  readonly description: string;
}
