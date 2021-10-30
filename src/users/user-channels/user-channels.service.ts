import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose'

import { User, UserDocument } from '../user.model';
import { Trash, TrashDocument } from '../../trashs/entities/trash.entity';
import { UserChannel, UserChannelDocument } from './entities/user-channel.entity';
import { ChannelNamesService } from '../../channel-names/channel-names.service';

import { AddUserChannelDto } from './dto/add-user-channel.dto';
import { RemoveUserChannelDto } from './dto/remove-user-channel.dto';
import { UpdateUserChannelDto } from './dto/update-user-channel.dto';



@Injectable()
export class UserChannelsService {
  constructor(
    @InjectModel(User.name) private userDB: Model<UserDocument>,
    @InjectModel(UserChannel.name) private userChannelDB: Model<UserChannelDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
        private nameService: ChannelNamesService
  ) {
  }

  async addUserChannel(dto: AddUserChannelDto): Promise<UserChannel> {
    const { idUser, channel, nick, desc } = dto
    if (!mongoose.isValidObjectId(idUser)){
      throw new HttpException({
        message: `Ошибка - ID #${idUser} не корректен!` }, HttpStatus.BAD_REQUEST);
    }
    let user
    try { user = await this.userDB.findById(idUser); } catch (e) { console.log(e) }
    // Проверка наличия пользователя
    if(!user) {
      throw new HttpException({
        message: `Ошибка - пользователь с ID #${idUser} не найден!` }, HttpStatus.NOT_FOUND); }
    // Проверка полей канал и ник
    // поле канал не заполнено
    if (!channel){ throw new HttpException({
        message: `Ошибка - поле названия канала пусто!` }, HttpStatus.BAD_REQUEST); }
    // поле ник не заполнено
    if (!nick){ throw new HttpException({
        message: `Ошибка - поле ника пусто!` }, HttpStatus.BAD_REQUEST); }
    // наличие ID удалённых каналов
    for(let i = 0; i < user.channels.length; i++){
      let findChannel
      try { findChannel = await this.userChannelDB.findById(user.channels[i]); } catch (e) { console.log(e) }
      if (!findChannel){
        if( user.channels.indexOf(user.channels[i]) > 0 ){
          user.channels.splice( user.channels.indexOf( user.channels[i] ), 1 )}
      } else {
        if (findChannel.nick === nick && findChannel.channel === channel){
          throw new HttpException({
            message: `Ошибка - канал с таким ником уже есть у данного пользователя!` }, HttpStatus.CONFLICT);
        }
      }
    }
    // Проверка имени канала
    let channelName
    try { channelName = await this.nameService.findOneName(channel) } catch (e) { console.log(e) }
    let newChannelName = channelName
    try { if (!channelName){
        newChannelName = await this.nameService.createName({ name: channel, description: 'создано автоматически' })
      } } catch (e) { console.log(e) }
    // const newDTO = { idUser: idUser, channel: newChannelName.name, nick: nick, description: desc }
    try {
      // Создание канала
      const newChannel = await new this.userChannelDB({ idUser: idUser, channel: newChannelName.name, nick: nick, desc: desc })
      await newChannel.save().then(() => {
        // сохранение ID канала в массив каналов пользователя
        user.channels.push(newChannel._id)
        user.save()
      })
      return newChannel
    }catch (e) {
      console.log(e)
    }
  }

  async findAllChannels(): Promise<UserChannel[]> {
    try {
      return await this.userChannelDB.find().exec()
    }catch (e) {
      console.log(e)
    }
  }

  async findChannelByNick( nick: string ): Promise<UserChannel> {
    let channel
    try { channel = await this.userChannelDB.find({ nick: nick }); } catch (e) { console.log(e) }
    if (!channel){ throw new HttpException({ message: `Ошибка - канал с ником - ${nick} не найден!` }, HttpStatus.NOT_FOUND); }
    return channel
  }

  async findOneChannelByID( id: ObjectId): Promise<UserChannel> {
    if ( !mongoose.isValidObjectId( id ) ) { throw new HttpException({ message: `Неверный формат ID - ${id}, \nтребуется ID канала, длинной 24 символа` }, HttpStatus.BAD_REQUEST) }
    let channel
    try { channel = await this.userChannelDB.findById(id); } catch (e) { console.log(e) }
    if (!channel){ throw new HttpException({ message: `Ошибка - канал с ID #${id} не найден!` }, HttpStatus.NOT_FOUND) }
    return channel
  }

  async updateChannel(id: ObjectId, dto: UpdateUserChannelDto) {
    const { channel, nick, desc } = dto;
    if ( !mongoose.isValidObjectId(id) ) { throw new HttpException({ message: `Неверный формат ID - ${id}, \nтребуется ID канала, длинной 24 символа` }, HttpStatus.NOT_FOUND);    }
    let updChannel
    try { updChannel = await this.userChannelDB.findById(id) } catch (e) { console.log(e) }
    if (!updChannel){ throw new HttpException({ message: `Ошибка - канал с ID #${id} не найден!` }, HttpStatus.NOT_FOUND); }
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

  async removeChannel(id: ObjectId, dto: RemoveUserChannelDto): Promise<UserChannel> {
    const { idCreator, desc } = dto
    if ( !mongoose.isValidObjectId(idCreator) ) { throw new HttpException({ message: `ID удаляющего пользователя #${idCreator} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let creator
    try { creator = await this.userDB.findById( idCreator ) } catch (e) { console.log(e) }
    if ( !creator ){ throw new HttpException({ message: `Удаляющий пользователь с ID #${idCreator} не найден` }, HttpStatus.NOT_FOUND)}
    if ( !mongoose.isValidObjectId(id) ){  throw new HttpException({ message: `ID удаляемого канала #${idCreator} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let delChannel
    try { delChannel = await this.userChannelDB.findById(id) } catch (e) { console.log(e) }
    if ( !delChannel ){ throw new HttpException({ message: `Удаляемый канал с ID #${id} не найден` }, HttpStatus.NOT_FOUND)}
    let user
    try { user = await this.userDB.findById(delChannel.idUser) } catch (e) { console.log(e) }
    if ( !user ) { throw new HttpException({ message: `Пользователь с ID #${delChannel.idUser} не найден!` }, HttpStatus.NOT_FOUND);}
    if (user.channels.indexOf(id) > 0) {user.channels.splice( user.channels.indexOf(id), 1 )}
    try {
      await user.save().then(() => {
        const trash = new this.trashDB({
          idCreator: idCreator, idUserChannel: delChannel.id,
          channel: delChannel.channel, nick: delChannel.nick, desc: desc })
        trash.save()
      })
      console.log(`Пользователем ${creator.name} c ID #${idCreator} удалён канал ${delChannel.channel} с ID #${id}`)
      return this.userChannelDB.findByIdAndDelete(id);
    }catch (e) {
      console.log(e)
    }
  }
}
