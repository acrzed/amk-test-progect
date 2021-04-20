import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserRolesDocument = UserRoles & Document

@Schema()
export class UserRoles {

  @ApiProperty({example:' - // -', description:'ID пользователя'})
  @Prop({ type: 'ObjectId', ref: 'User', require:true })
  userID: string
  @ApiProperty({example:' - // -', description:'ID роли'})
  @Prop({ type: 'ObjectId', ref: 'Role', require: true })
  roleID: string;
}

export const UserRolesSchema = SchemaFactory.createForClass(UserRoles);
