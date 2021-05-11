import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUslugyDto {
  @ApiProperty({ example: 'BOLT, НП, прочее...', description: 'название услуги' })
  @IsString({message:'Название услуги должно быть строкой'} )
  readonly name: string;
  @ApiProperty({ example: 'такси, почта, прочее', description: 'категория услуги - cсылка' })
  @IsString({message:'Название категории должно быть строкой'} )
  readonly category: string;
  @ApiProperty({ example: 'описание, детали', description: '' })
  @IsString({message:'Описание должно быть строкой'} )
  readonly note: string
}
