import { ApiProperty } from '@nestjs/swagger';

export class RoleAddDto {
  @ApiProperty({example:'ADMIN', description:'роль пользователя'})
  readonly value: string;
  @ApiProperty({example:'ID', description:'ID пользователя'})
  readonly userId: string;
}
