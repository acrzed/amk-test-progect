import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type RoleDocument = Role & Document

@Schema()
export class Role {
  @ApiProperty({example:'ADMIN', description:'роль пользователя'})
  @Prop({require:true, unique: true, type: String, default:'USER'})
  value: string
  @ApiProperty({example:'Администратор', description:'описание роли - допуск, ограничение, etc.'})
  @Prop({ require: true, type: String })
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
