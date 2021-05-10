import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryUslugDto {
  @ApiProperty({ example: 'такси, почта, прочее', description: 'категория услуг' })
  readonly name: string;
  @ApiProperty({ example: 'описание, детали', description: '' })
  readonly note: string
}
