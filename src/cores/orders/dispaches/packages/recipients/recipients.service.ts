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
import { SupsService } from '../../../../sups/sups.service';
import { RemoveTrashDto } from '../../../../../comCores/trashs/dto/remove-trash.dto';

@Injectable()
export class RecipientsService {
  constructor(
    @InjectModel(User.name) private userDB: Model<UserDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
    @InjectModel(Client.name) private clientDB: Model<ClientDocument>,
    @InjectModel(Recipient.name) private recipientDB: Model<RecipientDocument>,
    private supsService: SupsService
  ) {
  }

  async create(dto: CreateRecipientDto): Promise<Recipient> {
    const { idClient, idCreator, lastName, name, middleName, phone } = dto
    // проверка наличия полей
    if ( !idCreator || !idClient || !lastName || !name || !middleName || !phone ){ throw new HttpException({ message: `Ошибка - одно или несколько полей не заполненно! Должны быть заполнены поля - idCreator, idClient, sender, lastName, name, middleName, phone` }, HttpStatus.BAD_REQUEST)}
    // проверка создающего пользователя
    await this.supsService.validateCreator(idCreator)
    // проверка клиента
    let client = await this.supsService.validateClient(idClient)
    // приведение поля номера телефона к цифрам
    let phoneNum = await this.supsService.stringToPhone(phone)
    // проверка кандидата
    if(await this.supsService.validateCandidateByRecipientToken(phoneNum, lastName, name, middleName)) {
      // создание получателя
      try {
        let recipientToken = await this.supsService.createRecipientToken(phoneNum, lastName, name, middleName)
      let recipient = await this.recipientDB.create({ ...dto, phone: phoneNum, recipientToken: recipientToken });
        await recipient.save()
        await client.recipients.push(recipient._id)
        await client.save()
        return recipient
      } catch (e) {
        console.log(e);
      }
    }
  }

  async findAll(): Promise<Recipient[]>  {
    try { return await this.recipientDB.find().exec() } catch (e) { console.log(e) }  }

  async findOne(id: string): Promise<Recipient> {
    return await this.supsService.validateRecipient(id)
  }

  async update(id: string, dto: UpdateRecipientDto) {
    // данные ДТО
    const { idClient, sender, lastName, name, middleName, phone, enterDate, ref, desc } = dto;
    // получатель
    let recipient = await this.supsService.validateRecipient(id)
    // данные до модификации
    let upIdClient = recipient.idClient, upSender = recipient.sender, upLastName = recipient.lastName,
      upName = recipient.name, upMiddleName = recipient.middleName, upPhone = recipient.phone,
      upEnterDate = recipient.enterDate, upRef = recipient.ref, upDesc = recipient.desc;
    // модификация данных
    if (idClient) { upIdClient = await this.supsService.validateClient(idClient) }
    sender ? upSender = sender : () => {}
    lastName ? upLastName = lastName : () => {}
    name ? upName = name : () => {}
    middleName ? upMiddleName = middleName : () => {}
    if (phone) { upPhone = await this.supsService.stringToPhone(phone) }
    if (enterDate) { upEnterDate = await this.supsService.stringToDate(enterDate) }
    ref ? upRef = ref : () => {}
    desc ? upDesc = desc : () => {}
    // сохранение
    return await recipient
      .$set('idClient', upIdClient)
      .$set('sender', upSender)
      .$set('lastName', upLastName)
      .$set('name', upName)
      .$set('middleName', upMiddleName)
      .$set('phone', upPhone)
      .$set('enterDate', upEnterDate)
      .$set('ref', upRef)
      .$set('desc', upDesc)
      .save()
  }

  async remove(id: string, dto: RemoveTrashDto) {
    const { idCreator, desc } = dto;
    // проверка создающего пользователя
    let creator = await this.supsService.validateCreator(idCreator)
     // проверка получателя
    let recipient = await this.supsService.validateRecipient(id)
    // проверка комментария
    await this.supsService.validateDesc(desc)
    // клиента
    let client = await this.supsService.validateClient(recipient.idClient)
    // удаление из списка получателей клиента
    try {
      if (client.recipients.indexOf(id) != -1) {
        await client.recipients.splice(client.recipients.indexOf(id), 1)
        await client.save() } } catch (e) { console.log(e) }

    // найти все отправки с этим получателем и добавить в заметки к клиенту
    // - такие то посылки были отправлены такому то получателю, получатель удалён

    // try {
    //   if (client.recipients.indexOf(id) != -1) {
    //     await client.recipients.splice(client.recipients.indexOf(id), 1)
    //     await client.save()
    //   } } catch (e) { console.log(e) }

      try {
        const trashRecipient = await new this.trashDB({
          idCreator: creator, removeDate: Date.now(), recipient: recipient, desc: desc
        })
        await trashRecipient.save() } catch (e) { console.log(e) }


  }

  async findByPhone(num: number) {
    let recipient
    try { recipient = await this.recipientDB.findOne({phone: num}) } catch (e) { console.log(e) }
    if ( !recipient ){ throw new HttpException({ message: `Получатель с телефоном #${num} не найден` }, HttpStatus.NOT_FOUND)}
    return recipient
  }

}
