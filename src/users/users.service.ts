import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userRepo: Model<UserDocument>) {
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userRepo(dto)
      return user.save()
    } catch (e) {
      console.log(e)
    }

  }

  // async createUser(dto: CreateUserDto): Promise<User> {
  //   const user = await this.userRepo.create(dto)
  //   return user.save()
  // }

  async getAllUsers(): Promise<User[]> {
    return this.userRepo.find().exec()

  }

}
