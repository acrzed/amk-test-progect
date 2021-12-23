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
import { Recipient, RecipientDocument } from '../orders/packages/recipients/entities/recipient.entity';
import { PostSrv, PostSrvDocument } from '../orders/packages/posts/entities/postSrv.entity';
import { City, CityDocument } from '../orders/packages/cities/entities/city.entity';
import { OrderType, OrderTypeDocument } from '../orders/order-types/entities/order-type.entity';
import { OrderStat, OrderStatDocument } from '../orders/order-stats/entities/order-stat.entity';
import { Package, PackageDocument } from '../orders/packages/entities/package.entity';

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
    @InjectModel(PostSrv.name) private postSrvDB: Model<PostSrvDocument>,
    @InjectModel(City.name) private cityDB: Model<CityDocument>,
    @InjectModel(Package.name) private packagesDB: Model<PackageDocument>,
    @InjectModel(OrderType.name) private orderTypeDB: Model<OrderTypeDocument>,
    @InjectModel(OrderStat.name) private orderStatDB: Model<OrderStatDocument>,
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
    // проверка заказа по ID:
        // key = 0 - вернуть заказ
        // key = 1 - вернуть заказ с развернутыми оплатами, доставками, получателями
        // key = 2 - вернуть true/false
    if ( !mongoose.isValidObjectId(idOrder) ){  throw new HttpException({ message: `ID заказа #${idOrder} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let order
    if (key === 0) { try { order = await this.orderDB.findById(idOrder) } catch (e) { console.log(e) } }
    if (key === 1) try { order = await this.orderDB.findById(idOrder).populate('pays') } catch (e) { console.log(e) }
    if (key === 2) try { if(await this.orderDB.findById(idOrder)) {return true} else {return false} } catch (e) { console.log(e) }
    if ( !order ){ throw new HttpException({ message: `Заказ с ID #${idOrder} не найден` }, HttpStatus.NOT_FOUND)}
    return order
  }

  async validatePost(idPost) {
    if ( !mongoose.isValidObjectId(idPost) ){  throw new HttpException({ message: `ID сервиса доставки #${idPost} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let post
    try { post = await this.postSrvDB.findById(idPost) } catch (e) { console.log(e) }
    if ( !post ){ throw new HttpException({ message: `Сервис доставки с ID #${idPost} не найден` }, HttpStatus.NOT_FOUND)}
    return post
  }

  async validateCity(idCity) {
    if ( !mongoose.isValidObjectId(idCity) ){  throw new HttpException({ message: `ID города #${idCity} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let city
    try { city = await this.cityDB.findById(idCity) } catch (e) { console.log(e) }
    if ( !city ){ throw new HttpException({ message: `Город с ID #${idCity} не найден` }, HttpStatus.NOT_FOUND)}
    return city
  }

  async validateOrderType(idOrderType) {
    if ( !mongoose.isValidObjectId(idOrderType) ){  throw new HttpException({ message: `ID типа заказа #${idOrderType} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let orderType
    try { orderType = await this.orderTypeDB.findById(idOrderType) } catch (e) { console.log(e) }
    if ( !orderType ){ throw new HttpException({ message: `Тип заказа с ID #${idOrderType} не найден` }, HttpStatus.NOT_FOUND)}
    return orderType
  }

  async validateOrderStatus(idOrderStat) {
    if ( !mongoose.isValidObjectId(idOrderStat) ){  throw new HttpException({ message: `ID статуса заказа #${idOrderStat} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let orderStatus
    try { orderStatus = await this.orderStatDB.findById(idOrderStat) } catch (e) { console.log(e) }
    if ( !orderStatus ){ throw new HttpException({ message: `Статус заказа с ID #${idOrderStat} не найден` }, HttpStatus.NOT_FOUND)}
    return orderStatus
  }

  async validatePay(idPay) {
    if ( !mongoose.isValidObjectId(idPay) ){  throw new HttpException({ message: `ID оплаты #${idPay} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let pay
    try { pay = await this.payDB.findById(idPay) } catch (e) { console.log(e) }
    if ( !pay ){ throw new HttpException({ message: `Оплата с ID #${idPay} не найдена` }, HttpStatus.NOT_FOUND)}
    return pay
  }

  async createPayHash(idOrder, payDateTime, paySum, key = 0) {
    // key = 0 - проверка на ошибку
    // key = 1 - логический true/false
    let payHash = String(idOrder) + '-' + String(paySum) + '-' + String(this.dateToString(payDateTime))
    if (key === 0) {
      await this.validatePayHash(payHash)
      return payHash
    }
    if (key === 1 ) {
      return await this.validatePayHash(payHash, 1)
    }
  }

  async validatePayHash(payHash, key = 0) {
    // key = 0 - проверка на ошибку
    // key = 1 - логический true/false
    let pay
    try { pay = await this.payDB.findOne({payHash: payHash}) } catch (e) { console.log(e) }
    if( key === 1 ) { if(pay) { return false; } else { return true; } }
    if ( pay ){ throw new HttpException({ message: `Оплата заказа с ID #${payHash.split('-')[0]} от ${payHash.split('-')[2]} на сумму ${payHash.split('-')[1]} грн. уже зафиксирована!` }, HttpStatus.NOT_FOUND)}
    return payHash
  }

  async createRecipientToken(phone, lastName, name, middleName){
    let recipientToken
    if ( lastName && name && middleName && phone) {
      recipientToken = lastName + name + middleName + String(phone)
    } else
      {throw new HttpException({ message: `Ошибка - не заполнено одно из полей - ${lastName} ${name} ${middleName} ${phone}!` }, HttpStatus.CONFLICT) }
    return recipientToken
  }

  async validateCandidateByRecipientToken(phone, lastName, name, middleName){
    let recipient, recipientToken = await this.createRecipientToken(phone, lastName, name, middleName)
    try { recipient = await this.recipientDB.findOne({recipientToken: recipientToken}) } catch (e) { console.log(e) }
    if ( recipient ) {
      throw new HttpException({ message: `Ошибка - получатель - ${recipient.lastName} ${recipient.name} ${recipient.middleName} с телефоном №${recipient.phone} - уже существует!` }, HttpStatus.CONFLICT) }
    return true
  }

  async validateRecipientByPhone(phone, lastName, name, middleName){
    let recipient
    try { recipient = await this.recipientDB.findOne({phone: phone}) } catch (e) { console.log(e) }
    if ( recipient && recipient.lastName == lastName && recipient.name == name && recipient.middleName == middleName && recipient.phone == phone) {
      throw new HttpException({ message: `Ошибка - получатель - ${recipient.lastName} ${recipient.name} ${recipient.middleName} с телефоном №${recipient.phone} - уже существует!` }, HttpStatus.CONFLICT) }
    return true
  }

  async validateRecipient(idRecipient){
    if ( !mongoose.isValidObjectId(idRecipient) ){
      throw new HttpException({ message: `ID получателя #${idRecipient} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let recipient
    try { recipient = await this.recipientDB.findById( idRecipient ) } catch (e) { console.log(e) }
    if ( !recipient ){
      throw new HttpException({ message: `Получатель с ID #${idRecipient} не найден` }, HttpStatus.NOT_FOUND)}
    return recipient
  }

  async validatePackage(idPackage) {
    if ( !mongoose.isValidObjectId(idPackage) ){  throw new HttpException({ message: `ID посылки #${idPackage} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let packagge
    try { packagge = await this.packagesDB.findById(idPackage) } catch (e) { console.log(e) }
    if ( !packagge ){ throw new HttpException({ message: `Посылка с ID #${idPackage} не найдена` }, HttpStatus.NOT_FOUND)}
    return packagge
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

  stringToDateTime(date: string, time: string){
    let moment = require('moment'); // require
    if ( !moment(date, "DD-MM-YYYY" ).isValid() ){
      throw new HttpException({ message: `данные даты - ${date} не корректны!` }, HttpStatus.CONFLICT)}
    if (!moment(time, "hh:mm").isValid()) {
      throw new HttpException({ message: `данные времени - ${time} не корректны!` }, HttpStatus.CONFLICT)}
    let d = date + ' ' + time
    return moment.utc(moment(d, "DD-MM-YYYY hh:mm"));
  }

  stringToDate(date: string){
    let moment = require('moment'); // require
    if ( !moment(date, "DD-MM-YYYY" ).isValid() ){
      throw new HttpException({ message: `данные даты - ${date} не корректны!` }, HttpStatus.CONFLICT)}
     return moment.utc(moment(date, "DD-MM-YYYY hh:mm"));
  }

  stringToPhone(str) {
    let phone = str.replace(/\D/g, '')
    if(phone.length > 12){
      throw new HttpException({ message: `данные телефона - ${str} не корректны!` }, HttpStatus.CONFLICT)}
    if(phone.length === 11){phone = "3" + phone}
    if(phone.length === 10){phone = "38" + phone}
    if(phone.length === 9){phone = "380" + phone}
    if(phone.length < 8){
      throw new HttpException({ message: `данные телефона - ${str} не корректны!` }, HttpStatus.CONFLICT)
    }
    return Number(phone)
  }

}
