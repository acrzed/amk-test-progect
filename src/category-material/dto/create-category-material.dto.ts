import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryMaterialDto {
  @ApiProperty({ example: 'ткань', description: 'категория материала' })
  readonly name: string;
  @ApiProperty({ example: 'описание, детали', description: '' })
  readonly note: string
}
