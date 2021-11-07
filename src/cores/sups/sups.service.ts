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

  async validateClient(idClient){
    if ( !mongoose.isValidObjectId(idClient) ){  throw new HttpException({ message: `ID клиента #${idClient} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let client
    try { client = await this.clientDB.findById(idClient) } catch (e) { console.log(e) }
    if ( !client ) { throw new HttpException({ message: `Клиент с ID #${idClient} не найден!` }, HttpStatus.NOT_FOUND);}
    return client
  }

  async validateOrder(idOrder){
    if ( !mongoose.isValidObjectId(idOrder) ){  throw new HttpException({ message: `ID заказа #${idOrder} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let order
    try { order = await this.orderDB.findById(idOrder) } catch (e) { console.log(e) }
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

  async validatePayHash(idOrder, payDate, payTime, paySum) {
    let pay
    let payHash = String(idOrder) + String(payDate) + String(paySum) + String(payTime)
    try { pay = await this.payDB.findOne({payHash: payHash}) } catch (e) { console.log(e) }
    if ( pay ){ throw new HttpException({ message: `Оплата заказа с ID #${idOrder} от ${payDate} ${payTime} на сумму ${paySum} уже зафиксирована!` }, HttpStatus.NOT_FOUND)}
    return payHash
  }

  validateDesc(desc){
    if (!desc) {
      throw new HttpException({ message: `Необходимо указать причину удаления` }, HttpStatus.NOT_FOUND);
    }
    return desc
  }

  dateToString (date){
    let formatter1 = new Intl.DateTimeFormat("ru");
    return formatter1.format(date)
  }

  stringToDate(date: string, time: string){
    let moment = require('moment'); // require
    let d = date + ' ' + time
    return moment.utc(moment(d, "DD-MM-YYYY hh:mm"));
  }

}
