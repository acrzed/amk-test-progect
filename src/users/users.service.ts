import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userRepo: Model<UserDocument>,
              private roleService: RolesService) {
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userRepo(dto)
      const role = await this.roleService.getRoleByValue('USER')
      await user.$set('roles',[role._id])
      return user.save()
    } catch (e) {
      console.log(e)
    }

  }

  async getUserByName(qwr: string){
    const user = await this.userRepo.findOne({ name: qwr })
    return user
  }

  // async createUser(dto: CreateUserDto): Promise<User> {
  //   const user = await this.userRepo.create(dto)
  //   return user.save()
  // }

  async getAllUsers(): Promise<User[]> {
    return this.userRepo.find().exec()

  }

}
