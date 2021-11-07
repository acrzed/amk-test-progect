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
import { RolesService } from '../../comCores/roles/roles.service';
import { UserPhonesService } from '../users/user-phones/user-phones.service';
import { UserChannelsService } from '../users/user-channels/user-channels.service';
import { DepartsService } from '../users/departs/departs.service';
import { ClientPhone, ClientPhoneDocument } from '../clients/client-phones/entities/client-phone.entity';
import { ClientChannel, ClientChannelDocument } from '../clients/client-channels/entities/client-channel.entity';
import { Order, OrderDocument } from '../orders/entities/order.entity';
import { Pay, PayDocument } from '../orders/pays/entities/pay.entity';
import { Dispatch, DispatchDocument } from '../orders/dispaches/entities/dispatch.entity';
import { Recipient, RecipientDocument } from '../orders/dispaches/packages/recipients/entities/recipient.entity';
import { UsersService } from '../users/users.service';
import { ClientPhonesService } from '../clients/client-phones/client-phones.service';
import { ClientChannelsService } from '../clients/client-channels/client-channels.service';
import { OrdersService } from '../orders/orders.service';
import { PaysService } from '../orders/pays/pays.service';
import { DispatchsService } from '../orders/dispaches/dispatchs.service';
import { RecipientsService } from '../orders/dispaches/packages/recipients/recipients.service';

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

  async validateCreator(idCreator: User){
    if ( !mongoose.isValidObjectId(idCreator) ) { throw new HttpException({ message: `ID удаляющего пользователя #${idCreator} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let creator
    try { creator = await this.userDB.findById( idCreator ) } catch (e) { console.log(e) }
    if ( !creator ){ throw new HttpException({ message: `Удаляющий пользователь с ID #${idCreator} не найден` }, HttpStatus.NOT_FOUND)}
    return idCreator
  }

  async validateClient(idClient: Client){
    if ( !mongoose.isValidObjectId(idClient) ){  throw new HttpException({ message: `ID клиента #${idClient} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let client
    try { client = await this.clientDB.findById(idClient) } catch (e) { console.log(e) }
    if ( !client ) { throw new HttpException({ message: `Пользователь с ID #${idClient} не найден!` }, HttpStatus.NOT_FOUND);}
    return client
  }

  async validateOrder(idOrder: Order){
    if ( !mongoose.isValidObjectId(idOrder) ){  throw new HttpException({ message: `ID удаляемого заказа #${idOrder} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let order
    try { order = await this.orderDB.findById(idOrder) } catch (e) { console.log(e) }
    if ( !order ){ throw new HttpException({ message: `Удаляемый заказ с ID #${idOrder} не найден` }, HttpStatus.NOT_FOUND)}
    return order
  }

  async validatePay(id: Pay) {
    if ( !mongoose.isValidObjectId(id) ){  throw new HttpException({ message: `ID удаляемой оплаты #${id} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let pay
    try { pay = await this.payDB.findById(id) } catch (e) { console.log(e) }
    if ( !pay ){ throw new HttpException({ message: `Удаляемая оплата с ID #${id} не найдена` }, HttpStatus.NOT_FOUND)}
    return pay
  }

  async validateDesc(desc){
    if (!desc) {
      throw new HttpException({ message: `Необходимо указать причину удаления` }, HttpStatus.NOT_FOUND);
    }
    return desc
  }

}
