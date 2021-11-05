import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './roles.model';
import { Model, ObjectId } from 'mongoose';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RemoveRoleDto } from './dto/remove-role.dto';
import * as mongoose from 'mongoose';
import { Trash, TrashDocument } from '../trashs/entities/trash.entity';

@Injectable()
export class RolesService {

  constructor(
    @InjectModel(Role.name) private roleBD: Model<RoleDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>
  ) {}

  async createRole(dto: CreateRoleDto){
    try {
      return await this.roleBD.create(dto)
    }catch (e) {
      console.log(e)
    }

  }

  async findAllRoles() {
    try {
      return await this.roleBD.find().exec()
    }catch (e) {
      console.log(e)
    }
  }

  async getRoleByValue(value: string){
    try {
      return await this.roleBD.findOne({value})
    }catch (e) {
      console.log(e)
    }
  }

  async updateRole(dto: UpdateRoleDto): Promise<Role> {
    try {
      const { value, description } = dto
      const role = await this.roleBD.findOne({value})
      let upValue = role.value, upDescription = role.description
      if (value){upValue = value}
      if (description){upDescription = description}
      role.$set('value', upValue).$set('description', upDescription)
      return role.save()
    }catch (e) {
      console.log(e)
    }
  }

  async removeRole(id: ObjectId, dto: RemoveRoleDto): Promise<Role> {
    try {
      const { idCreator, desc } = dto
      if (!mongoose.isValidObjectId(idCreator)){
        throw new HttpException({ message: `Удаляющий пользователь с ID ${idCreator} не найден` }, HttpStatus.NOT_FOUND).message;
      }
      if (!mongoose.isValidObjectId(id)){
        throw new HttpException({ message: `Роль с ID ${id} не найдена` }, HttpStatus.NOT_FOUND).message;
      }
      const role = await this.roleBD.findById(id)
      if (!role){
        throw new HttpException({ message: `Роль с ID ${id} не найдена` }, HttpStatus.NOT_FOUND).message;
      }
      const trash = await new this.trashDB({
        idCreator: idCreator, idChannelName: role.id,
        role: role.value, desc: desc })
      await trash.save()
      return await this.roleBD.findByIdAndDelete(id)
    }catch (e) {
      console.log(e)
    }
  }
}
