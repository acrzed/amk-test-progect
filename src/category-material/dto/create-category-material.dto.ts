import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryMaterialDto {
  @ApiProperty({ example: 'ткань', description: 'категория материала' })
  @IsString({message:'Название категории должно быть строкой'} )
  readonly name: string;
  @ApiProperty({ example: 'описание, детали', description: '' })
  @IsString({message:'Описание должно быть строкой'} )
  readonly note: string
}
