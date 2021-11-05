import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import { User, UserDocument } from 'src/cores/users/user.model';
import { Client, ClientDocument } from '../entities/client.entity';
import { ClientPhone, ClientPhoneDocument } from './entities/client-phone.entity';
import { Trash, TrashDocument } from '../../../comCores/trashs/entities/trash.entity';

import { AddClientPhoneDto } from './dto/add-client-phone.dto';
import { UpdateClientPhoneDto } from './dto/update-client-phone.dto';
import { RemoveTrashDto } from '../../../comCores/trashs/dto/remove-trash.dto';
import { UsersService } from '../../users/users.service';
import { ClientsService } from '../clients.service';




@Injectable()
export class ClientPhonesService {
  constructor(
    @InjectModel(User.name) private userDB: Model<UserDocument>,
    @InjectModel(Client.name) private clientDB: Model<ClientDocument>,
    @InjectModel(ClientPhone.name) private clientPhoneDB: Model<ClientPhoneDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
    private userService: UsersService,
    private clientService: ClientsService,
  ) {
  }

  async addClientPhone(dto: AddClientPhoneDto): Promise<ClientPhone>{
    const { idClient, phone, desc } = dto
    let phoneCandidate, phoneAdd: number
    phoneAdd = this.phoneStrToNumber(phone)
    try { phoneCandidate = await this.clientPhoneDB.findOne({phone: phoneAdd}) } catch (e) { console.log(e) }
    // проверка уникальности номера
    if(phoneCandidate){
      let clientOwner
      try { clientOwner = await this.clientDB.findById(phoneCandidate.idClient) } catch (e) { console.log(e) }
      throw new HttpException({
        message: `Ошибка - телефон с номером - #${phoneCandidate.phone} уже зарегистрирован за пользователем ${clientOwner.name}!` }, HttpStatus.CONFLICT); }
    // Поиск пользователя
    let client
    try { client = await this.clientDB.findById(idClient) } catch (e) { console.log(e) }
    // Проверка наличия пользователя
    if(!client){
      throw new HttpException({
        message: `Ошибка - пользователь с ID #${idClient} не найден!` }, HttpStatus.NOT_FOUND); }
    let newClientPhone
    try {
      // Создание телефона
      newClientPhone = await new this.clientPhoneDB({idClient: idClient, phone: phoneAdd, desc: desc})
      await newClientPhone.save().then(() => {
      // Внесение ID телефона в массив телефонов пользователя
        client.phones.push(newClientPhone._id)
        client.save()
      })
    }catch (e) {
      console.log(e)
    }
    return newClientPhone
  }

  async findAllClientPhone(): Promise<ClientPhone[]> {
    try {
      return await this.clientPhoneDB.find().exec();
    }catch (e) {
      console.log(e)
    }
  }

  async findClientPhone(number: any): Promise<ClientPhone> {
    let phone
    number = this.phoneStrToNumber(number)
    try { phone = await this.clientPhoneDB.findOne({phone: number}) } catch (e) { console.log(e) }
    if ( phone ) { return phone }
    throw new HttpException({ message: `Ошибка - телефон с №${number} - не найден!` }, HttpStatus.NOT_FOUND)
  }

  async findClientPhoneById(id: ClientPhone): Promise<ClientPhone> {
    return await this.validateClientPhone(id)
  }

  async updateClientPhone(id:ClientPhone, dto: UpdateClientPhoneDto) {
    const { upPhone, upDesc } = dto
    let phoneNumber = this.phoneStrToNumber(upPhone)
    let phoneCandidate
    try { phoneCandidate = await this.clientPhoneDB.findOne({phone: phoneNumber}) } catch (e) { console.log(e) }
    // проверка уникальности номера
    if( phoneCandidate ){
      let userOwner
      try { userOwner = await this.clientDB.findById(phoneCandidate.idClient) } catch (e) { console.log(e) }
      throw new HttpException({
        message: `Ошибка - телефон с номером - #${phoneCandidate.phone} уже зарегистрирован за пользователем ${userOwner.name}!` }, HttpStatus.CONFLICT); }
    let updPhone = await this.validateClientPhone(id)
    let phoneDTO, descDTO;
    if ( upPhone ){ phoneDTO = upPhone } else { phoneDTO = updPhone.phone }
    if ( upDesc ){ descDTO = upDesc } else { descDTO = updPhone.desc }
    try { updPhone.$set('phone', phoneDTO);
          updPhone.$set('desc', descDTO);
          await updPhone.save()
    } catch (e) { console.log(e) }
    return updPhone;
  }

  async removeClientPhone(id: ClientPhone, dto: RemoveTrashDto):Promise<ClientPhone> {
    const { idCreator, desc } = dto;
    let creator = await this.userService.validateCreator(idCreator)
    let phone = await this.validateClientPhone(id)
    let client = await this.clientService.validateClient(phone.idClient)
    let numPhone;
    numPhone = phone.phone;
    try {
      client.phones.splice(client.phones.indexOf(id),1)
      await client.save()
      const del = await this.clientPhoneDB.findByIdAndDelete(id)
      const trash = await new this.trashDB({
        idCreator: idCreator, idClientPhone: id, phone: numPhone, desc: desc })
      console.log(`Пользователем ${creator.name} удалён телефон ${numPhone} с ID #${del.id}`)
      await trash.save()
      return del;
    } catch (e) {
      console.log(e)
    }
  }

  async findByAnyPhone(any: any) {
    try {
      let result;
      if (any.length < 9) {
        result = this.clientDB.find({name: any})
      } else if (String(any).length < 14) {
        result = await this.clientPhoneDB.findOne({ phone: Number(any) });
      } else if (String(any).length > 14){
        result = this.findClientPhoneById(any)
      }
      return result
    }catch (e) {
      console.log(e)
    }
  }

  async validateClientPhone(idPhone: ClientPhone) {
    if ( !mongoose.isValidObjectId(idPhone) ){  throw new HttpException({ message: `ID удаляемого телефона #${idPhone} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let phone
    try { phone = await this.clientPhoneDB.findById(idPhone) } catch (e) { console.log(e) }
    if ( !phone ){ throw new HttpException({ message: `Удаляемый телефон с ID #${idPhone} не найден` }, HttpStatus.NOT_FOUND)}
    return phone
  }

  phoneStrToNumber(phone): number{
    let phoneNumber = phone.toString().replace(/^\s\s*/, '').replace(/\s\s*$/, '')
    if (phoneNumber.length > 9) {
      return Number(phoneNumber);
    }
    throw new HttpException({ message: `Ошибка - телефон №${phone} некорректен!` }, HttpStatus.CONFLICT);
  }


}
