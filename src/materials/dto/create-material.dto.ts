import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty({ example: 'лён, флис и т.д.', description: 'название материала' })
  @IsString({message:'Название материала должно быть строкой'} )
  readonly name: string;
  @ApiProperty({ example: 'ткань', description: 'категория материала - cсылка' })
  @IsString({message:'Название категории должно быть строкой'} )
  readonly category: string;
  @ApiProperty({ example: 'описание, детали', description: '' })
  @IsString({message:'Описание должно быть строкой'} )
  readonly note: string
}
