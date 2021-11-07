import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import * as mongoose from 'mongoose';


import { User, UserDocument } from '../../users/user.model';
import { Client, ClientDocument } from '../entities/client.entity';
import { ClientChannel, ClientChannelDocument } from './entities/client-channel.entity';
import { Trash, TrashDocument } from '../../../comCores/trashs/entities/trash.entity';

import { AddClientChannelDto } from './dto/add-client-channel.dto';
import { UpdateClientChannelDto } from './dto/update-client-channel.dto';
import { RemoveTrashDto } from '../../../comCores/trashs/dto/remove-trash.dto';

import { ChannelNamesService } from '../../../comCores/channel-names/channel-names.service';
import { UsersService } from '../../users/users.service';
import { ClientsService } from '../clients.service';



@Injectable()
export class ClientChannelsService {
  constructor(
    @InjectModel(Client.name) private clientDB: Model<ClientDocument>,
    @InjectModel(User.name) private userDB: Model<UserDocument>,
    @InjectModel(ClientChannel.name) private clientChannelDB: Model<ClientChannelDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
        private nameService: ChannelNamesService
  ) {
  }


  async addClientChannel(dto: AddClientChannelDto): Promise<ClientChannel> {
    const { idClient, channel, nick, desc } = dto
    // let client = await this.clientService.validateClient(idClient)
    let client = await this.clientDB.findById(idClient)
    // Проверка полей канал и ник
    // поле канал не заполнено
    if (!channel){ throw new HttpException({ message: `Ошибка - поле названия канала пусто!` }, HttpStatus.BAD_REQUEST) }
    // поле ник не заполнено
    if (!nick){ throw new HttpException({ message: `Ошибка - поле ника пусто!` }, HttpStatus.BAD_REQUEST) }
    // наличие ID удалённых каналов
    for(let i = 0; i < client.channels.length; i++){
      let findChannel
      try { findChannel = await this.clientChannelDB.findById(client.channels[i]); } catch (e) { console.log(e) }
      if (!findChannel){
        if( client.channels.indexOf(client.channels[i]) > 0 ){
          client.channels.splice( client.channels.indexOf( client.channels[i] ), 1 )}
      }
    }
    // проверка на дубликат
    let channelCan
    try { channelCan = await this.clientChannelDB.findOne({hashChannel: (channel + '-' + nick)}); } catch (e) { console.log(e) }
    if (channelCan){
        throw new HttpException({  message: `Ошибка - канал ${channelCan.channel} и ником ${channelCan.nick} уже есть у пользователя ${channelCan.idClient}!`, }, HttpStatus.CONFLICT) }
    // Проверка имени канала
    let channelName
    try { channelName = await this.nameService.findOneName(channel) } catch (e) { console.log(e) }
    let newChannelName = channelName
    try { if (!channelName){ newChannelName = await this.nameService.createName({ name: channel, description: 'создано автоматически' })} } catch (e) { console.log(e) }
    // Создание канала
    try {
      const newChannel = await new this.clientChannelDB({ idClient: idClient, channel: newChannelName.name, nick: nick, hashChannel: (newChannelName.name + '-' + nick), desc: desc })
      await newChannel.save().then(() => {
        // сохранение ID канала в массив каналов пользователя
        client.channels.push(newChannel._id)
        client.save()
      })
      return newChannel
    }catch (e) {
      console.log(e)
    }
  }

  async findAllChannels(): Promise<ClientChannel[]> {
    try {
      return await this.clientChannelDB.find().exec()
    }catch (e) {
      console.log(e)
    }
  }

  async findChannelByNick( nick: string ): Promise<ClientChannel> {
    let channel
    try { channel = await this.clientChannelDB.find({ nick: nick }); } catch (e) { console.log(e) }
    if (!channel){ throw new HttpException({ message: `Ошибка - канал с ником - ${nick} не найден!` }, HttpStatus.NOT_FOUND); }
    return channel
  }

  async findOneChannelByID( id: ClientChannel): Promise<ClientChannel> {
    let channel = await this.validateClientChannel(id)
    return channel
  }

  async updateChannel(id: ClientChannel, dto: UpdateClientChannelDto) {
    const { channel, nick, desc } = dto;
    let updChannel = await this.validateClientChannel(id)
    let upChannel = updChannel.channel, upNick = updChannel.nick, upDesc = updChannel.desc, newChannelName;
    if (channel){
      let channelName
      try { channelName = await this.nameService.findOneName(channel) } catch (e) { console.log(e) }
      if (!channelName && String(channel).length > 4){
        try { newChannelName = await this.nameService.createName({ name: channel, description: 'создано автоматически' }) } catch (e) { console.log(e) }
      } else { newChannelName = channelName }
    }
    if ( channel ){ upChannel = newChannelName.name }
    if ( nick ) { upNick = nick }
    if ( desc ) { upDesc = desc }
    try { updChannel.$set('channel', upChannel).$set('nick', upNick).$set('desc', upDesc).save() } catch (e) { console.log(e) }
    return updChannel;
  }

  async removeChannel(id: ClientChannel, dto: RemoveTrashDto): Promise<ClientChannel> {
    const { idCreator, desc } = dto
    let creator = await this.userDB.findById(idCreator)
    let delChannel = await this.validateClientChannel(id)
    let client = await this.clientDB.findById(delChannel.idClient)
    if (client.channels.indexOf(id) > 0) {client.channels.splice( client.channels.indexOf(id), 1 )}
    try {
      await client.save().then(() => {
        const trash = new this.trashDB({
          idCreator: idCreator, idClientChannel: delChannel.id,
          channel: delChannel.channel, nick: delChannel.nick, desc: desc })
        trash.save()
      })
      console.log(`Пользователем ${creator.name} c ID #${idCreator} удалён канал ${delChannel.channel} с ID #${id}`)
      return this.clientChannelDB.findByIdAndDelete(id);
    }catch (e) {
      console.log(e)
    }
  }

  async validateClientChannel(idChannel: ClientChannel){
    if ( !mongoose.isValidObjectId(idChannel) ){  throw new HttpException({ message: `ID удаляемого канала #${idChannel} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let channel
    try { channel = await this.clientChannelDB.findById(idChannel) } catch (e) { console.log(e) }
    if ( !channel ){ throw new HttpException({ message: `Удаляемый канал с ID #${idChannel} не найден` }, HttpStatus.NOT_FOUND)}
    return channel
  }
}
