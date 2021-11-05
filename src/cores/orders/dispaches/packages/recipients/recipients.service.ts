import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { Recipient, RecipientDocument } from './entities/recipient.entity';
import { User, UserDocument } from '../../../../users/user.model';
import { Trash, TrashDocument } from '../../../../../comCores/trashs/entities/trash.entity';
import { Client, ClientDocument } from '../../../../clients/entities/client.entity';
import { RemoveRecipientDto } from './dto/remove-recipient.dto';

@Injectable()
export class RecipientsService {
  constructor(
    @InjectModel(User.name) private userDB: Model<UserDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
    @InjectModel(Client.name) private clientDB: Model<ClientDocument>,
    @InjectModel(Recipient.name) private recipientDB: Model<RecipientDocument>,
  ) {
  }

    validObjectID(obj) {
    if (!mongoose.isValidObjectId(obj)){
      throw new HttpException({ message: `Ошибка - ID #${obj} не корректен!` }, HttpStatus.BAD_REQUEST);
    }
    return true }
    notEmpty(str) {
    let obj = str.toString()
      if (obj.length < 2){
        throw new HttpException({ message: `Ошибка - поле ${obj} заполненно не корректно!` }, HttpStatus.BAD_REQUEST);
      }
      return true
    }

  async create(dto: CreateRecipientDto): Promise<Recipient> {
    const { idClient, idCreator, lastName, name, middleName, phone, sender, enterDate, desc } = dto
    // проверка наличия полей
    if ( !idCreator || !idClient || !lastName || !name || !middleName || !phone ){ throw new HttpException({ message: `Ошибка - одно или несколько полей не заполненно! Должны быть заполнены поля - idCreator, idClient, sender, lastName, name, middleName, phone` }, HttpStatus.BAD_REQUEST)}
    // проверка длины телефона
    if (phone.toString().length != 10){throw new HttpException({ message: `Поле ${phone} заполнено не верно, требуется номер телефона вида 098*******, 10 цифр` }, HttpStatus.BAD_REQUEST)}
    // проверка создающего пользователя
    if (this.validObjectID(idCreator)){}
    let creator
    try { creator = await this.userDB.findById( idCreator ) } catch (e) { console.log(e) }
    if ( !creator ){ throw new HttpException({ message: `Пользователь с ID #${idCreator} не найден` }, HttpStatus.NOT_FOUND)}
    // проверка клиента
    if (this.validObjectID(idClient)){}
    let client
    try { client = await this.clientDB.findById( idClient ) } catch (e) { console.log(e) }
    if ( !client ){ throw new HttpException({ message: `Пользователь с ID #${idClient} не найден` }, HttpStatus.NOT_FOUND)}
    // проверка кандидата
    let candidate
    try { candidate = await this.recipientDB.findOne({phone: phone}) } catch (e) { console.log(e) }
    if ( candidate ){
      if (candidate.lastName == lastName && candidate.name == name && candidate.middleName == middleName && candidate.phone == phone) { throw new HttpException({ message: `Ошибка - получатель - ${candidate.lastName} ${candidate.name} ${candidate.middleName} с телефоном №${candidate.phone} - уже существует!` }, HttpStatus.CONFLICT) }}
    // создание получателя
    try {
      candidate = await this.recipientDB.create(dto)
      await candidate.save() } catch (e) { console.log(e) }
    return candidate;
  }

  async findAll(): Promise<Recipient[]>  {
    try {
      return await this.recipientDB.find().exec()
    }catch (e) {
      console.log(e)
    }
  }

  async findOne(id: ObjectId): Promise<Recipient> {
    if (this.validObjectID(id)){}
    let recipient
    try { recipient = await this.recipientDB.findById( id ) } catch (e) { console.log(e) }
    if ( !recipient ){ throw new HttpException({ message: `Получатель с ID #${id} не найден` }, HttpStatus.NOT_FOUND)}
    return recipient
  }

  async update(id: ObjectId, updateRecipientDto: UpdateRecipientDto) {
    return `This action updates a #${id} recipient`;
  }

  async remove(id: ObjectId, dto: RemoveRecipientDto) {
    const { idCreator, desc } = dto;
    // проверка создающего пользователя
    if (this.validObjectID(idCreator)){}
    let creator
    try { creator = await this.userDB.findById( idCreator ) } catch (e) { console.log(e) }
    if ( !creator ){ throw new HttpException({ message: `Пользователь с ID #${idCreator} не найден` }, HttpStatus.NOT_FOUND)}
    // проверка получателя
    let recipient
    try { recipient = await this.recipientDB.findById(id) } catch (e) { console.log(e) }
    if ( !recipient ){throw new HttpException({ message: `Получатель с ID #${idCreator} не найден` }, HttpStatus.NOT_FOUND)}
    // проверка комментария
    if (!desc){throw new HttpException({ message: `требуется комментарий - причина удаления` }, HttpStatus.BAD_REQUEST)}


  }

  async findByPhone(num: number) {
    let recipient
    try { recipient = await this.recipientDB.findOne({phone: num}) } catch (e) { console.log(e) }
    if ( !recipient ){ throw new HttpException({ message: `Получатель с телефоном #${num} не найден` }, HttpStatus.NOT_FOUND)}
    return recipient
  }
}
