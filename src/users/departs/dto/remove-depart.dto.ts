import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsString, Length } from 'class-validator';
import { User } from '../../user.model';


export class RemoveDepartDto {

  @ApiProperty({ example: 'UserID', description: 'UserID - ID создателя' })
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Length(24, 24, {message: 'требуется ID пользователя удаляющего канал, длинной 24 символа'})
  readonly idCreator: User;

  @ApiProperty({example:'Sellers', description:'название отдела'})
  @Prop({ require: true, type:String})
  @IsString({message:'название отдела должно быть строкой'} )
  readonly name: string;

  @ApiProperty({ example: 'комментарий', description: 'причина, заметки, описание' })
  @Length(5, 600, {message: 'требуется комментарий - причина удаления'})
  @Prop({ require: true, type: String })
  readonly desc: string
}
