import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type RoleDocument = Role & Document

@Schema()
export class Role {

  @ApiProperty({example:'ADMIN', description:'роль пользователя'})
  @Prop({ required: true, unique: true, type: String, default:'GUEST'})
  value: string

  @ApiProperty({example:'Администратор', description:'описание роли - допуск, ограничение, etc.'})
  @Prop({ required: true, type: String })
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
