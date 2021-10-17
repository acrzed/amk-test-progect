import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { UserCreateDto } from './dto/user-create.dto';
import { Model} from 'mongoose';
import { RolesService } from '../roles/roles.service';
import { RoleAddDto } from './dto/role-add.dto';
import { DepartUpdateDto } from './dto/depart-update.dto';
import { DepartsService } from '../departs/departs.service';
import { AddPhoneDto } from '../clients/dto/add-phone.dto';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userDB: Model<UserDocument>,
              private roleService: RolesService,
              private departService: DepartsService
  ) {
  }

  async createUser(dto: UserCreateDto): Promise<User> {
    try {
      const user = await new this.userDB(dto);
      const { phone } = dto
      const newPhone = []
      newPhone.push(phone)
      user.$set('phone', newPhone)
      const role = await this.roleService.getRoleByValue('USER');
      await user.$set('roles', [role.value]);
      return user.save();
    } catch (e) {
      console.log(e);
    }
}

  async getUserByName(name: string) {
    return this.userDB.findOne({ name: name });
  }

  checkId(id){
    if (id.length === 24){
      return true
    }
    return false
  }

  async getUserByID(id: string): Promise<User> {
    try {
      if(this.checkId(id)){
        return await this.userDB.findById( id ).populate('depart');
      }
      throw new HttpException({ message: 'Пользователь не найден' }, HttpStatus.NOT_FOUND);

    }catch (e) {
      console.log(e)
    }

  }

  async getAllUsers(): Promise<User[]> {
    return this.userDB.find().populate('depart');
  }

  async addRole(dto: RoleAddDto) {
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
  }
  async updDept(dto: DepartUpdateDto) {
    if(this.checkId(dto.userID)) {
      const user = await this.userDB.findById(dto.userID);
      const deptID = await this.departService.findByName(dto.dept);
      if(user && deptID){
        //const { name } = deptID;
        user.$set('depart', deptID)
        return user.save()
      }
    }
    throw new HttpException({ message: 'Не найден отдел или пользователь' }, HttpStatus.NOT_FOUND);
}

  async addUserPhone(dto: AddPhoneDto){
    const { idClient } = dto
    if(this.checkId(idClient)){
      const user = await this.userDB.findById( idClient )
      const { phone } = dto;
      if(user && phone){
        const newArrPhone = [];
        for (let i = 0; i < user.phone.length; i++){
          if (user.phone[i] != phone){
            newArrPhone.push(user.phone[i]);
          }
        }
        newArrPhone.push(phone)
        user.$set('phone', newArrPhone);
        user.save()
        return user
      }

    }
  }

}
