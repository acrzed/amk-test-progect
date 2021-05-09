import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({example:'ADMIN', description:'роль пользователя'})
  readonly value: string;
  @ApiProperty({example:'ID', description:'ID пользователя'})
  readonly userId: string;
}
