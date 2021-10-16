import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Model, ObjectId } from 'mongoose';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdDeptDto } from './dto/update-dept.dto';
import { DeptsService } from '../depts/depts.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userDBRepo: Model<UserDocument>,
              private roleService: RolesService,
              //private deptService: DeptsService
  ) {
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userDBRepo(dto);
      const role = await this.roleService.getRoleByValue('USER');
      await user.$set('roles', [role.value]);
      return user.save();
    } catch (e) {
      console.log(e);
    }
}

  async getUserByName(name: string) {
    return this.userDBRepo.findOne({ name: name });
  }
  async getUserByID(id: ObjectId): Promise<User> {
    return this.userDBRepo.findById( id ).populate('dept');
  }

  async getAllUsers(): Promise<User[]> {
    return this.userDBRepo.find().exec();
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userDBRepo.findById(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      const { value } = role;
      user.roles.push(value);
      user.save();
      console.log(user.roles);
      return dto;
    }
    throw new HttpException({ message: 'Не найдена роль или пользователь' }, HttpStatus.NOT_FOUND);
  }
  async updDept(dto: UpdDeptDto) {
    console.log(dto)
    const user = await this.userDBRepo.findById(dto.userID);
    //const deptID = await this.deptService.findByName(dto.dept);
    console.log(user)
    /*
    if (deptID && user) {
      const { id } = deptID;
      user.dept = id;
      user.save();
      console.log(user.id, user.dept);
      return dto;

    }

    throw new HttpException({ message: 'Не найдено подразделение или пользователь' }, HttpStatus.NOT_FOUND);
  */
  }

}
