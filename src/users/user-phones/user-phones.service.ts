import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

import { User, UserDocument } from '../user.model';
import { Trash, TrashDocument } from '../../trashs/entities/trash.entity';
import { UserPhone, UserPhoneDocument } from './entities/user-phone.entity';

import { AddUserPhoneDto } from './dto/add-user-phone.dto';
import { UpdateUserPhoneDto } from './dto/update-user-phone.dto';
import { RemoveUserPhoneDto } from './dto/remove-user-phone.dto';


@Injectable()
export class UserPhonesService {
  constructor(
    @InjectModel(User.name) private userDB: Model<UserDocument>,
    @InjectModel(UserPhone.name) private userPhoneDB: Model<UserPhoneDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>
  ) {
  }

  async addUserPhone(dto: AddUserPhoneDto): Promise<UserPhone>{
    const { idUser, phone, desc } = dto
    let phoneCandidate
    try { phoneCandidate = await this.userPhoneDB.findOne({phone: phone}) } catch (e) { console.log(e) }
    // проверка уникальности номера
    if(phoneCandidate){
      let userOwner
      try { userOwner = await this.userDB.findById(phoneCandidate.idUser) } catch (e) { console.log(e) }
      throw new HttpException({
        message: `Ошибка - телефон с номером - #${phoneCandidate.phone} уже зарегистрирован за пользователем ${userOwner.name}!` }, HttpStatus.CONFLICT); }
    // Поиск пользователя
    let user
    try { user = await this.userDB.findById(idUser) } catch (e) { console.log(e) }
    // Проверка наличия пользователя
    if(!user){
      throw new HttpException({
        message: `Ошибка - пользователь с ID #${idUser} не найден!` }, HttpStatus.NOT_FOUND); }
    let newUserPhone
    try {
      // Создание телефона
      newUserPhone = await new this.userPhoneDB({idUser: idUser, phone: phone, desc: desc})
      await newUserPhone.save().then(() => {
      // Внесение ID телефона в массив телефонов пользователя
        user.phones.push(newUserPhone._id)
        user.save()
      })
    }catch (e) {
      console.log(e)
    }
    return newUserPhone
  }

  async findAllUserPhone(): Promise<UserPhone[]> {
    try {
      return await this.userPhoneDB.find().exec();
    }catch (e) {
      console.log(e)
    }
  }

  async findOneUserPhone(number: number): Promise<UserPhone> {
    if( String(number).length < 9 || String(number).length > 13 ) {
      throw new HttpException({ message: `Ошибка - ${number} - не верный формат телефона!` }, HttpStatus.BAD_REQUEST);
    }
    let phone
    try { phone = await this.userPhoneDB.findOne({phone: String(number)}) } catch (e) { console.log(e) }
    if ( phone ) { return phone }
    throw new HttpException({ message: `Ошибка - телефон с №${number} - не найден!` }, HttpStatus.NOT_FOUND)
  }

  async findUserPhoneById(id: ObjectId): Promise<UserPhone> {
    if( !mongoose.isValidObjectId(id) ) {
      throw new HttpException({ message: `Ошибка - ID #${id} не корректен!` }, HttpStatus.NOT_FOUND); }
    const phone = await this.userPhoneDB.findById(id)
    if ( !phone ){
      throw new HttpException({ message: `Ошибка - телефон с ID #${id} не найден!` }, HttpStatus.NOT_FOUND); }
    return phone
  }

  async updateUserPhone(id:ObjectId, updateUserPhoneDto: UpdateUserPhoneDto) {
    const { upPhone, upDesc } = updateUserPhoneDto
    let phoneCandidate
    try { phoneCandidate = await this.userPhoneDB.findOne({phone: upPhone}) } catch (e) { console.log(e) }
    // проверка уникальности номера
    if( phoneCandidate ){
      let userOwner
      try { userOwner = await this.userDB.findById(phoneCandidate.idUser) } catch (e) { console.log(e) }
      throw new HttpException({
        message: `Ошибка - телефон с номером - #${phoneCandidate.phone} уже зарегистрирован за пользователем ${userOwner.name}!` }, HttpStatus.CONFLICT); }
    if( !mongoose.isValidObjectId(id) ) { throw new HttpException({ message: `Ошибка - ID #${id} не корректен!` }, HttpStatus.BAD_REQUEST);}
    let updPhone
    try { updPhone = await this.userPhoneDB.findById(id) } catch (e) { console.log(e) }
    if ( !updPhone ) { throw new HttpException({ message: `Телефон с ID #${id} не найден!` }, HttpStatus.NOT_FOUND);}
    let phoneDTO, descDTO;
    if ( upPhone ){ phoneDTO = upPhone } else { phoneDTO = updPhone.phone }
    if ( upDesc ){ descDTO = upDesc } else { descDTO = updPhone.desc }
    try { updPhone.$set('phone', phoneDTO);
          updPhone.$set('desc', descDTO);
          await updPhone.save()
    } catch (e) { console.log(e) }
    return updPhone;
  }

  async removeUserPhone(id: ObjectId, dto: RemoveUserPhoneDto):Promise<UserPhone> {
    const { idCreator, desc } = dto;
    let numPhone, userID;
    if ( !mongoose.isValidObjectId(idCreator) ){ throw new HttpException({ message: `ID удаляющего пользователя #${idCreator} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let creator
    try { creator = await this.userDB.findById( idCreator ) } catch (e) { console.log(e) }
    if ( !creator ){ throw new HttpException({ message: `Удаляющий пользователь с ID #${idCreator} не найден` }, HttpStatus.NOT_FOUND)}
    if ( !mongoose.isValidObjectId(id) ){  throw new HttpException({ message: `ID удаляемого телефона #${idCreator} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let delPhone
    try { delPhone = await this.userPhoneDB.findById(id) } catch (e) { console.log(e) }
    if ( !delPhone ){ throw new HttpException({ message: `Удаляемый телефон с ID #${id} не найден` }, HttpStatus.NOT_FOUND)}
    numPhone = delPhone.phone;
    userID = delPhone.idUser
    if ( !mongoose.isValidObjectId(userID) ){ throw new HttpException({ message: `ID владельца удаляемого телефона #${idCreator} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let user
    try { user = await this.userDB.findById(userID) } catch (e) { console.log(e) }
    if (!user){ throw new HttpException({ message: `Ошибка - пользователь ${user.name} не найден!` }, HttpStatus.NOT_FOUND);}
    try {
      user.phones.splice(user.phones.indexOf(id),1)
      await user.save()
      const del = await this.userPhoneDB.findByIdAndDelete(id)
      const trash = await new this.trashDB({
        idCreator: idCreator, idUserPhone: id, phone: numPhone, desc: desc })
      console.log(`Пользователем ${creator.name} удалён телефон ${numPhone} с ID #${del.id}`)
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
