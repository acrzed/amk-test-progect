import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDepartDto } from './create-depart.dto';
import { IsString } from 'class-validator';

export class UpdateDepartDto extends PartialType(CreateDepartDto) {


  @ApiProperty({example:'Sellers', description:'название отдела'})
  @IsString({message:'название отдела должно быть строкой'} )
  readonly name: string;

  @ApiProperty({example:'Отдел продаж', description:'описание отдела - допуск, ограничение, etc.'})
  @IsString({message:'название отдела должно быть строкой'} )
  readonly desc: string;
}
