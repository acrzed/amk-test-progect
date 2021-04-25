import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userRepo: Model<UserDocument>,
              private roleService: RolesService) {
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userRepo(dto);
      const role = await this.roleService.getRoleByValue('USER');
      await user.$set('roles', [role.value]);
      return user.save();
    } catch (e) {
      console.log(e);
    }

  }

  async getUserByName(qwr: string) {
    return this.userRepo.findOne({ name: qwr });
  }

  // async createUser(dto: CreateUserDto): Promise<User> {
  //   const user = await this.userRepo.create(dto)
  //   return user.save()
  // }

  async getAllUsers(): Promise<User[]> {
    return this.userRepo.find().exec();
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepo.findById(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      const { value } = role;
      user.roles.push(value);
      user.save();
      console.log(user.roles);
      // await user.add('role',role.value)
      // arr.push(add)
      // user.roles.push({ role });
      return dto;
    }
    throw new HttpException({ message: 'Не найдена роль или пользователь' }, HttpStatus.NOT_FOUND);
  }

}
