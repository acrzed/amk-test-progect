import { ApiProperty } from '@nestjs/swagger';

export class CreateUslugyDto {
  @ApiProperty({ example: 'BOLT, НП, прочее...', description: 'название услуги' })
  readonly name: string;
  @ApiProperty({ example: 'такси, почта, прочее', description: 'категория услуги - cсылка' })
  readonly category: string;
  @ApiProperty({ example: 'описание, детали', description: '' })
  readonly note: string
}
