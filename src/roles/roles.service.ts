import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './roles.model';
import { Model } from 'mongoose';

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role.name) private roleRepo: Model<RoleDocument>) {}

  async createRole(dto: CreateRoleDto){
    const role = await this.roleRepo.create(dto)
    return role
  }

  async getRoleByValue(value: string){
    const role = await this.roleRepo.findOne({value})
    return role
  }
}
