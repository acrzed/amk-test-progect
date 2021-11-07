import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import { User, UserDocument } from '../users/user.model';
import { Client, ClientDocument } from './entities/client.entity';
import { ClientChannel, ClientChannelDocument } from './client-channels/entities/client-channel.entity';
import { ClientPhone, ClientPhoneDocument } from './client-phones/entities/client-phone.entity';
import { Order, OrderDocument } from '../orders/entities/order.entity';
import { Pay, PayDocument } from '../orders/pays/entities/pay.entity';
import { Dispatch, DispatchDocument } from '../orders/dispaches/entities/dispatch.entity';
import { Recipient, RecipientDocument } from '../orders/dispaches/packages/recipients/entities/recipient.entity';
import { Trash, TrashDocument } from '../../comCores/trashs/entities/trash.entity';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { RemoveTrashDto } from '../../comCores/trashs/dto/remove-trash.dto';

import { ClientPhonesService } from './client-phones/client-phones.service';
import { ClientChannelsService } from './client-channels/client-channels.service';
import { OrdersService } from '../orders/orders.service';
import { PaysService } from '../orders/pays/pays.service';
import { DispatchsService } from '../orders/dispaches/dispatchs.service';
import { RecipientsService } from '../orders/dispaches/packages/recipients/recipients.service';
import { UsersService } from '../users/users.service';
import { SupsService } from '../sups/sups.service';




@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(User.name) private userDB: Model<UserDocument>,
    @InjectModel(Client.name) private clientDB: Model<ClientDocument>,
    @InjectModel(ClientPhone.name) private clientPhoneDB: Model<ClientPhoneDocument>,
    @InjectModel(ClientChannel.name) private channelDB: Model<ClientChannelDocument>,
    @InjectModel(Order.name) private orderDB: Model<OrderDocument>,
    @InjectModel(Pay.name) private payDB: Model<PayDocument>,
    @InjectModel(Dispatch.name) private dispatchDB: Model<DispatchDocument>,
    @InjectModel(Recipient.name) private recipientDB: Model<RecipientDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
              private userService: UsersService,
              private phoneService: ClientPhonesService,
              private channelService: ClientChannelsService,
              private orderService: OrdersService,
              private payService: PaysService,
              private dispatchService: DispatchsService,
              private recipientService: RecipientsService,
              private supsService: SupsService
  ) {
  }

  //'This action adds a new client';
  async create(dto: CreateClientDto) {
    let allKeys = Object.keys(dto)
    if (allKeys.includes('desc') && allKeys.length === 6){}
    else {
      if (!allKeys.includes('desc') && allKeys.length === 5){}
      else {
      throw new HttpException({ message: `Ошибка - одно из полей не заполнено!` }, HttpStatus.CONFLICT);
    } }
    const { idCreator, name, phone, channel, nick, desc } = dto
    // проверка по телефону
    let candidate, phoneCan
    try {
      phoneCan = await this.clientPhoneDB.findOne({phone: this.phoneService.phoneStrToNumber(phone)})
      if (phoneCan) {
        candidate = await this.clientDB.findById(phoneCan.idClient);
      }
    } catch (e) { console.log(e) }
    if (candidate) { throw new HttpException({ message: `Ошибка - пользователь - ${candidate.name} с номером телефона ${phone} уже существует!` }, HttpStatus.CONFLICT); }
    // проверка по каналам
    // проверка на дубликат
    let channelCan
    try { channelCan = await this.channelDB.findOne({hashChannel: (channel + '-' + nick)}); } catch (e) { console.log(e) }
    if (channelCan){
      throw new HttpException({  message: `Ошибка - канал ${channelCan.channel} и ником ${channelCan.nick} уже есть у пользователя ${channelCan.idClient}!`, }, HttpStatus.CONFLICT) }
    let client, comm
    if (!desc){ comm = "" } else { comm = desc }
    try {
      client = await new this.clientDB({ name: name, idCreator: idCreator, desc: comm });
      await client.save()
      await this.phoneService.addClientPhone({idClient: client._id, phone: phone, desc: 'добавлен при регистрации'})
      await this.channelService.addClientChannel({idClient: client._id, channel: channel, nick: nick, desc: 'добавлен при регистрации'})
      await client.save()
      return await this.getClientByID(client._id)
    } catch (e) { console.log(e) }
  }

  async findAll(): Promise<Client[]> {
    return await this.clientDB.find().exec()
    //`This action returns all clients`;
  }
//`This action returns a #${id} client`
  async getClientByID(id: Client): Promise<Client> {
    const client = await this.clientDB.findById( id )
    .populate('phones')
    .populate('channels')
    .populate('orders')
    .populate('pays')
    .populate('dispatchs')
    .populate('recipients');
    if(client){ return client }
    throw new HttpException({ message: `Ошибка - пользователь c ID #${client} не найден!` }, HttpStatus.NOT_FOUND);
 }

  async getClientByPhone(phone: any): Promise<Client> {
    let client, clientPhone
    try {
      clientPhone = await this.phoneService.findClientPhone( phone )
      client = await this.clientDB.findOne({ _id: clientPhone.idClient } )
        .populate('phones')
        .populate('channels')
        .populate('orders')
        .populate('pays')
        .populate('dispatchs')
        .populate('recipients');
      if(client){ return client }
    }catch (e) {
      console.log(e)
    }
    throw new HttpException({ message: `Ошибка - пользователь c ID #${client} не найден!` }, HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  // `This action removes a #${id} client`
  async removeClient(id: Client, dto: RemoveTrashDto): Promise<Client> {
    const { idCreator, desc } = dto
    // проверка ID и наличие пользователей
    // удаляющий
    let creator = await this.supsService.validateCreator(idCreator)
    // удаляемый
    let client = await this.supsService.validateClient(id)
    // причина удаления
    await this.supsService.validateDesc(desc)
    // удаление
    // удалить телефоны
    await client.phones.forEach((id: ClientPhone) => {this.phoneService.removeClientPhone(id, dto)})
    // удалить каналы
    await client.channels.forEach((id: ClientChannel) => {this.channelService.removeChannel(id, dto)})
    // удалить заказы
    await client.orders.forEach((id: Order) => {this.orderService.removeOrder(id, dto)})
    // удалить оплаты

    // удалить отправки
    // удалить получателей

    client = await this.clientDB.findByIdAndDelete( id );
    return client
  }



  /*

  async addClientPhone(dto: AddClientPhoneDto){
    const { idClient, phone } = dto
    const client = await this.clientDB.findById( idClient )
    if(client && phone){
      const newArrPhone = [];
      for (let i = 0; i < client.phones.length; i++){
        if (client.phones[i].phone != phone){
          newArrPhone.push(client.phones[i]);
        }
      }
      newArrPhone.push(phone)
      client.$set('phone', newArrPhone);
      client.save()
      return client
    }
    return `Клиент с ID #${idClient} не найден`
  }

  async removeClientPhone(removePhoneDto: RemoveDto){
    const { idClient } = removePhoneDto
    const client = await this.clientDB.findById( idClient )
    const { phone } = removePhoneDto;
    const ar = client.phones.length
    if(client && phone){
      const newArrPhone = [];
      // for (let i = 0; i < client.phones.length; i++){
      //   if (client.phones[i].phone != phone){
      //     newArrPhone.push(client.phones[i]);
      //   }
      // }
      if (newArrPhone.length === ar){
        return `У клиента ${client.name} не найден номер телефона ${phone}`
      }
      client.$set('phone', newArrPhone);
      client.save().then(() => {
        const { idCreator, desc } = removePhoneDto
        const trash = new this.trashDB({...removePhoneDto, idCreator: idCreator, desc: desc})
        trash.save()
      } )
      return client
    }
  }

  async addChannel(dto: AddChannelDto): Promise<Client> {
    if (String(dto.idClient).length != 24){
      throw new HttpException({ message: 'Ошибка - неверный ID пользователя!' }, HttpStatus.NOT_FOUND);
    }
    const client = await this.clientDB.findById(dto.idClient)
    const channel = await this.channelDB.create({...dto})
    client.channels.push(channel._id)
    await client.save()
    return client
  }

  async removeChannel(dto: RemoveChannelDto): Promise<Client>{
    try {
      const { idClientChannel } = dto;
      let channel = await this.channelDB.findById(idClientChannel);
      const client = await this.clientDB.findById(channel.idClient);
      let delChannelClientIndex = client.channels.indexOf(channel)
      if (delChannelClientIndex < 0){
        throw new HttpException({ message: `Ошибка - у клиента ${client.name} канал с ID #${idClientChannel} не найден!` }, HttpStatus.NOT_FOUND);
      }
      client.channels.splice(delChannelClientIndex, 1);

      await this.channelDB.findByIdAndDelete(idClientChannel);
      client.save()
        .then(()=>{
          const trash = new this.trashDB(dto)
          trash.save()
        })
      return client
    }catch (e) {
      console.log(e)
    }

  }
*/
}



