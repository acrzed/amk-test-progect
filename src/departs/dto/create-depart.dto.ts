import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDepartDto {
  @ApiProperty({example:'Sellers', description:'название отдела', required: true})
  @IsString({message:'название отдела должно быть строкой'} )
  readonly name: string;
  @ApiProperty({example:'Отдел продаж', description:'описание отдела - допуск, ограничение, etc.'})
  @IsString({message:'название отдела должно быть строкой'} )
  readonly desc: string;

}
