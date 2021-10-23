import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {

  @ApiProperty({example:'USER', description:'роль пользователя'})
  readonly value: string

  @ApiProperty({example:'Пользователь', description:'описание роли пользователя'})
  readonly description: string;

}
