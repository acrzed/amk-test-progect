import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class UpdDeptDto {

  @ApiProperty({example:'Seller', description:'Подразделение пользователя'})
  readonly dept: string;

  @ApiProperty({example:'id', description:'ID пользователя'})
  readonly userID: ObjectId;
}
