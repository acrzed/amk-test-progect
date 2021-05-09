import { ApiProperty } from '@nestjs/swagger';

export class CreateMaterialDto {
  @ApiProperty({ example: 'лён, флис и т.д.', description: 'название материала' })
  readonly name: string;
  @ApiProperty({ example: 'ткань', description: 'категория материала - cсылка' })
  readonly category: string;
  @ApiProperty({ example: 'описание, детали', description: '' })
  readonly note: string
}
