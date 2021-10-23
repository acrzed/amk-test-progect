import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserPhoneDto } from './dto/update-user-phone.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Trash, TrashDocument } from '../../trashs/entities/trash.entity';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from '../user.model';
import { UserPhone, UserPhoneDocument } from './entities/user-phone.entity';
import { AddUserPhoneDto } from './dto/add-user-phone.dto';
import { RemoveUserPhoneDto } from './dto/remove-user-phone.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class UserPhonesService {
  constructor(
    @InjectModel(User.name) private userDB: Model<UserDocument>,
    @InjectModel(UserPhone.name) private userPhoneDB: Model<UserPhoneDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
  ) {
  }

  async addUserPhone(dto: AddUserPhoneDto): Promise<UserPhone>{
    try {
      const { idUser, phone, desc } = dto
      // проверка уникальности номера
      const phoneCandidate = await this.userPhoneDB.findOne({phone: phone})
      if(phoneCandidate){
        const userOwner = await this.userDB.findById(phoneCandidate.idUser)
        console.log(userOwner)
        throw new HttpException({
          message: `Ошибка - телефон с номером - #${phoneCandidate.phone} уже есть в базе данных!` }, HttpStatus.CONFLICT);
      }
      // Поиск пользователя
      const user = await this.userDB.findById(idUser);
      // Проверка наличия пользователя
      if(!user){
        throw new HttpException({
          message: `Ошибка - пользователь с ID #${idUser} не найден!` }, HttpStatus.NOT_FOUND);
      }
      // Создание телефона
      const newUserPhone = await new this.userPhoneDB({idUser: idUser, phone: phone, desc: desc})
      await newUserPhone.save().then(() => {
      // Внесение ID телефона в массив телефонов пользователя
        user.phones.push(newUserPhone._id)
        user.save()
      })
      return newUserPhone
    }catch (e) {
      console.log(e)
    }
  }

  async findAllUserPhone(): Promise<UserPhone[]> {
    try {
      return await this.userPhoneDB.find().exec();
    }catch (e) {
      console.log(e)
    }
  }

  async findOneUserPhone(number: number): Promise<UserPhone> {
    try {
      if( String(number).length < 9 || String(number).length > 13 ) {
        throw new HttpException({ message: `Ошибка - ${number} - не верный формат телефона!` }, HttpStatus.NOT_FOUND);
      }
      return await this.userPhoneDB.findOne({phone: String(number)})
    }catch (e) {
      console.log(e)
    }
  }

  async findUserPhoneById(id: ObjectId): Promise<UserPhone> {
    try {
      if( mongoose.isValidObjectId(id) ) {
        return await this.userPhoneDB.findById(id)
      }
      throw new HttpException({ message: `Ошибка - телефон с ID #${id} не найден!` }, HttpStatus.NOT_FOUND).message;
    }catch (e) {
      console.log(e)
    }
  }

  async updateUserPhone(updateUserPhoneDto: UpdateUserPhoneDto) {
    try {
      const { phone, upPhone, upDesc } = updateUserPhoneDto
      const updPhone = await this.userPhoneDB.findOne({phone: phone})
      if (!updPhone){
        throw new HttpException({ message: `Телефон с номером ${phone} не найден!` }, HttpStatus.NOT_FOUND);
      }
      let phoneDTO, descDTO;
      if ( upPhone ){
        phoneDTO = upPhone
      } else { phoneDTO = phone }
      if ( upDesc ){
        descDTO = upDesc
      } else {
        descDTO = updPhone.desc
      }
      updPhone.$set('phone', phoneDTO);
      updPhone.$set('desc', descDTO);
      await updPhone.save()
      return updPhone;
    }catch (e) {
      console.log(e)
    }
  }

  async removeUserPhone(dto: RemoveUserPhoneDto):Promise<UserPhone> {
    try {
      const { idCreator, idRemoveUserPhone, phone, desc } = dto;
      let idPhone, numPhone, userID;
      if (!idRemoveUserPhone){
        if (!phone){
          throw new HttpException({ message: 'Нужно указать телефон или ID телефона' }, HttpStatus.NOT_FOUND).message;
        }
      }
      if (!phone) {
        if (!mongoose.isValidObjectId(idRemoveUserPhone)){
          throw new HttpException({ message: `Ошибка - телефон с ID #${idRemoveUserPhone} не найден!` }, HttpStatus.NOT_FOUND).message;
        }
        const phoneInBdById = await this.userPhoneDB.findById(idRemoveUserPhone);
        if (!mongoose.isValidObjectId(phoneInBdById) || !phoneInBdById){
          throw new HttpException({ message: `Ошибка - телефон с ID #${idRemoveUserPhone} не найден!` }, HttpStatus.NOT_FOUND).message;
        }
        idPhone = phoneInBdById;
        numPhone = phoneInBdById.phone;
        userID = phoneInBdById.idUser
      }
      else {
        const phoneInBdByNumber = await this.userPhoneDB.findOne({ phone: phone });
        if (!phoneInBdByNumber){
          throw new HttpException({ message: `Ошибка - телефон с номером ${phone} не найден!` }, HttpStatus.NOT_FOUND);
        }
        idPhone = phoneInBdByNumber.id;
        numPhone = phone;
        userID = phoneInBdByNumber.idUser
      }
      const user = await this.userDB.findById(userID)
      if (!user){
        throw new HttpException({ message: `Ошибка - пользователь ${user} не найден!` }, HttpStatus.NOT_FOUND);
      }
      user.phones.splice(user.phones.indexOf(idPhone),1)
      await user.save()
      const del = await this.userPhoneDB.findByIdAndDelete(idPhone)
      const trash = await new this.trashDB({
        idCreator: idCreator, idUserPhone: idPhone, phone: numPhone, desc: desc })
      console.log(`Пользователем c ID #${idCreator} удалён телефон ${numPhone} с ID #${del.id}`)
      await trash.save()
      return del;
    } catch (e) {
      console.log(e)
    }
  }

  async findUserPhone(any: any) {
    try {
      let result;
      if (any.length < 9) {
        result = this.userDB.find({name: any})
      } else if (String(any).length < 14) {
        result = await this.userPhoneDB.findOne({ phone: String(any) });
      } else if (String(any).length > 14){
        result = this.findUserPhoneById(any)
      }
      return result
    }catch (e) {
      console.log(e)
    }
  }


}
