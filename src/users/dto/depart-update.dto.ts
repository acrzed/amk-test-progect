import { ApiProperty } from '@nestjs/swagger';


export class DepartUpdateDto {

  @ApiProperty({example:'Seller', description:'Подразделение пользователя'})
  readonly dept: string;

  @ApiProperty({example:'id', description:'ID пользователя'})
  readonly userID: string;
}
