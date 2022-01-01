import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDepartDto {

  @ApiProperty({example:'Sellers', description:'название отдела', required: true})
  @IsString({message:'dto: название отдела должно быть строкой'} )
  readonly name: string;

  @ApiProperty({example:'Отдел продаж', description:'описание отдела - допуск, ограничение, etc.'})
  @IsString({message:'описание  отдела должно быть строкой'} )
  readonly desc: string;

  // @ApiProperty({example:'ссылка на картинку', description:'картинка'})
  // readonly img: string;

}
