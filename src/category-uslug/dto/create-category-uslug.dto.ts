import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryUslugDto {
  @ApiProperty({ example: 'такси, почта, прочее', description: 'категория услуг' })
  @IsString({message:'Название категории должно быть строкой'} )
  readonly name: string;
  @ApiProperty({ example: 'описание, детали', description: '' })
  @IsString({message:'Описание должно быть строкой'} )
  readonly note: string
}
