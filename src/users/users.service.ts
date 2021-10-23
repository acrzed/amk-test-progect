import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { UserCreateDto } from './dto/user-create.dto';
import { Model, ObjectId } from 'mongoose';
import { RolesService } from '../roles/roles.service';
import { RoleAddDto } from './dto/role-add.dto';
import { DepartUpdateDto } from './dto/depart-update.dto';
import { DepartsService } from './departs/departs.service';
import { Depart, DepartDocument } from './departs/depart.model';
import { RemoveUserDto } from './dto/remove-user.dto';
import { UserPhone, UserPhoneDocument } from './user-phones/entities/user-phone.entity';
import { Trash, TrashDocument } from '../trashs/entities/trash.entity';
import { UserPhonesService } from './user-phones/user-phones.service';
import * as mongoose from 'mongoose';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userDB: Model<UserDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
    @InjectModel(Depart.name) private departDB: Model<DepartDocument>,
    @InjectModel(UserPhone.name) private userPhonesDB: Model<UserPhoneDocument>,
              private roleService: RolesService,
              private phoneService: UserPhonesService,
              private departService: DepartsService
  ) {
  }

  checkId(id){
    if (mongoose.isValidObjectId(id)){
      return true
    }
    console.log(`ID #${id} NO valid`)
    return false
  }

  async createUser(dto: UserCreateDto): Promise<User> {
    try {
      const user = await new this.userDB(dto);
      const { phone } = dto
      const newPhone = []
      newPhone.push(phone)
      user.$set('phone', newPhone)
      const role = await this.roleService.getRoleByValue('GUEST');
      const depart = await this.departDB.findOne({ name: 'Staff' })
      await user.$set('roles', [role.value]);
      await user.$set('depart', depart._id);
      return user.save();
    } catch (e) {
      console.log(e);
    }
}

  async getUserByName(name: string) {
    return this.userDB.findOne({ name: name })
      .populate('depart')
      .populate('phones')
      .populate('channels');
  }

  async getUserByID(id: ObjectId): Promise<User> {
    try {
      if( mongoose.isValidObjectId( id ) ){
        return await this.userDB.findById( id )
          .populate('depart')
          .populate('phones')
          .populate('channels');
      }
      throw new HttpException({ message: 'Пользователь не найден' }, HttpStatus.NOT_FOUND).message;

    }catch (e) {
      console.log(e)
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.userDB.find().populate('depart');
  }

  async removeUser(dto: RemoveUserDto): Promise<User> {
    try {
      const { idRemoveUser, idCreator, desc } = dto
      if (idRemoveUser == idCreator) {
        throw new HttpException({ message: `Ошибка - невозможно удалить самого себя!` }, HttpStatus.CONFLICT);
      }
      const user = await this.userDB.findByIdAndDelete(idRemoveUser)
      if (!user) {
        throw new HttpException({ message: `Ошибка - пользователь с ID #${idRemoveUser} не найден!` }, HttpStatus.NOT_FOUND);
      }
      for (let i = 0; i < user.phones.length; i++){
        let delPhone = await this.userPhonesDB.findByIdAndDelete(user.phones[i])
        if(delPhone){
          const trash = new this.trashDB({
            idCreator: idCreator, idUserPhone: delPhone._id,
            phone: delPhone.phone, desc: `Удаление пользователя ${idRemoveUser.name}`,
          });
          await trash.save();
        }
      }
      const trashUser = await new this.trashDB({
        idCreator: idCreator, idUser: idRemoveUser,
        removeDate: Date.now(), roles: user.roles,
        idDepart: user.depart, desc: desc })
      await trashUser.save()
      return user
    }catch (e) {
      console.log(e)
    }
  }

  async addRole(dto: RoleAddDto) {
    try {
      if (this.checkId(dto.userId)){
        const user = await this.userDB.findById(dto.userId);
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
    }catch (e) {
      console.log(e)
    }

  }

  async updDept(dto: DepartUpdateDto) {
    try {
      if(this.checkId(dto.userID)) {
        const user = await this.userDB.findById(dto.userID);
        const deptID = await this.departService.findByName(dto.dept);
        if(user && deptID){
          //const { name } = deptID;
          user.$set('depart', deptID)
          return user.save()
        }
        throw new HttpException({ message: 'Не найден отдел или пользователь' }, HttpStatus.NOT_FOUND);

      }
    }catch (e) {
      console.log(e)
    }
}






}
