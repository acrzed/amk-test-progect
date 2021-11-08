import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.model';
import { Client, ClientDocument } from '../clients/entities/client.entity';
import { Depart, DepartDocument } from '../users/departs/depart.model';
import { UserPhone, UserPhoneDocument } from '../users/user-phones/entities/user-phone.entity';
import { UserChannel, UserChannelDocument } from '../users/user-channels/entities/user-channel.entity';
import { ChannelName, ChannelNameDocument } from '../../comCores/channel-names/entities/channel-name.entity';
import { Trash, TrashDocument } from '../../comCores/trashs/entities/trash.entity';

import { ClientPhone, ClientPhoneDocument } from '../clients/client-phones/entities/client-phone.entity';
import { ClientChannel, ClientChannelDocument } from '../clients/client-channels/entities/client-channel.entity';
import { Order, OrderDocument } from '../orders/entities/order.entity';
import { Pay, PayDocument } from '../orders/pays/entities/pay.entity';
import { Dispatch, DispatchDocument } from '../orders/dispaches/entities/dispatch.entity';
import { Recipient, RecipientDocument } from '../orders/dispaches/packages/recipients/entities/recipient.entity';

@Injectable()
export class SupsService {
  constructor(
    @InjectModel(User.name) private userDB: Model<UserDocument>,
    @InjectModel(Depart.name) private departDB: Model<DepartDocument>,
    @InjectModel(UserPhone.name) private userPhonesDB: Model<UserPhoneDocument>,
    @InjectModel(UserChannel.name) private channelsDB: Model<UserChannelDocument>,
    @InjectModel(ChannelName.name) private channelsNameDB: Model<ChannelNameDocument>,
    @InjectModel(Client.name) private clientDB: Model<ClientDocument>,
    @InjectModel(ClientPhone.name) private clientPhoneDB: Model<ClientPhoneDocument>,
    @InjectModel(ClientChannel.name) private channelDB: Model<ClientChannelDocument>,
    @InjectModel(Order.name) private orderDB: Model<OrderDocument>,
    @InjectModel(Pay.name) private payDB: Model<PayDocument>,
    @InjectModel(Dispatch.name) private dispatchDB: Model<DispatchDocument>,
    @InjectModel(Recipient.name) private recipientDB: Model<RecipientDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,


  ) {}


  async validateCreator(idCreator){
    if ( !mongoose.isValidObjectId(idCreator) ) { throw new HttpException({ message: `ID пользователя #${idCreator} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let creator
    try { creator = await this.userDB.findById( idCreator )
      .populate('depart')
      .populate('phones')
      .populate('channels') } catch (e) { console.log(e) }
    if ( !creator ){ throw new HttpException({ message: `Пользователь с ID #${idCreator} не найден` }, HttpStatus.NOT_FOUND)}
    return creator
  }

  async validateDTO (dto, count) {
    let allKeys = Object.keys(dto)
    if (allKeys.includes('desc') && allKeys.length === count){}
    else {
      if (!allKeys.includes('desc') && allKeys.length === count-1){}
      else {
        throw new HttpException({ message: `Ошибка - одно из полей не заполнено!` }, HttpStatus.CONFLICT);
      } }
  }

  async validateClient(idClient){
    if ( !mongoose.isValidObjectId(idClient) ){  throw new HttpException({ message: `ID клиента #${idClient} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let client
    try { client = await this.clientDB.findById(idClient) } catch (e) { console.log(e) }
    if ( !client ) { throw new HttpException({ message: `Клиент с ID #${idClient} не найден!` }, HttpStatus.NOT_FOUND);}
    return client
  }

  async validateOrder(idOrder, key = 1){
    if ( !mongoose.isValidObjectId(idOrder) ){  throw new HttpException({ message: `ID заказа #${idOrder} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let order
    if (key === 0) { try { order = await this.orderDB.findById(idOrder) } catch (e) { console.log(e) } }
    else try { order = await this.orderDB.findById(idOrder).populate('pays') } catch (e) { console.log(e) }
    if ( !order ){ throw new HttpException({ message: `Заказ с ID #${idOrder} не найден` }, HttpStatus.NOT_FOUND)}
    return order
  }

  async validatePay(idPay) {
    if ( !mongoose.isValidObjectId(idPay) ){  throw new HttpException({ message: `ID оплаты #${idPay} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let pay
    try { pay = await this.payDB.findById(idPay) } catch (e) { console.log(e) }
    if ( !pay ){ throw new HttpException({ message: `Оплата с ID #${idPay} не найдена` }, HttpStatus.NOT_FOUND)}
    return pay
  }

  async validatePayHash(idOrder, payDateTime, paySum) {
    let pay
    let payHash = String(idOrder) + '-' + String(paySum) + '-' + String(this.dateToString(payDateTime))
    try { pay = await this.payDB.findOne({payHash: payHash}) } catch (e) { console.log(e) }
    if ( pay ){ throw new HttpException({ message: `Оплата заказа с ID #${idOrder} от ${this.dateToString(payDateTime)} на сумму ${paySum} уже зафиксирована!` }, HttpStatus.NOT_FOUND)}
    return payHash
  }

  async validateRecipientByPhone(phone, lastName, name, middleName){
    let recipient
    try { recipient = await this.recipientDB.findOne({phone: phone}) } catch (e) { console.log(e) }
    if ( recipient && recipient.lastName == lastName && recipient.name == name && recipient.middleName == middleName && recipient.phone == phone) { throw new HttpException({ message: `Ошибка - получатель - ${recipient.lastName} ${recipient.name} ${recipient.middleName} с телефоном №${recipient.phone} - уже существует!` }, HttpStatus.CONFLICT) }
    return true
  }

  async validateRecipient(idRecipient){
    if ( !mongoose.isValidObjectId(idRecipient) ){ throw new HttpException({ message: `ID получателя #${idRecipient} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let recipient
    try { recipient = await this.recipientDB.findById( idRecipient ) } catch (e) { console.log(e) }
    if ( !recipient ){ throw new HttpException({ message: `Получатель с ID #${idRecipient} не найден` }, HttpStatus.NOT_FOUND)}
    return recipient
  }

  validateDesc(desc){
    if (!desc) {
      throw new HttpException({ message: `Необходимо указать причину удаления` }, HttpStatus.NOT_FOUND);
    }
    return desc
  }

  dateToString (date: any) {
    let moment = require('moment'); // require
    if ( !moment(date).isValid() ){
      throw new HttpException({ message: `данные даты - ${date} не корректны!` }, HttpStatus.CONFLICT)}
    return moment(date).format("DD.MM.YYYY HH:mm");
  }

  stringToDate(date: string, time: string){
    let moment = require('moment'); // require
    if ( !moment(date, "DD-MM-YYYY" ).isValid() ){
      throw new HttpException({ message: `данные даты - ${date} не корректны!` }, HttpStatus.CONFLICT)}
    if (!moment(time, "hh:mm").isValid()) {
      throw new HttpException({ message: `данные времени - ${time} не корректны!` }, HttpStatus.CONFLICT)}
    let d = date + ' ' + time
    return moment.utc(moment(d, "DD-MM-YYYY hh:mm"));
  }

}
