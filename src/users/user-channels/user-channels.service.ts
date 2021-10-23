import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserChannelDto } from './dto/update-user-channel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user.model';
import { Model, ObjectId } from 'mongoose';
import { Trash, TrashDocument } from '../../trashs/entities/trash.entity';
import { UserChannel, UserChannelDocument } from './entities/user-channel.entity';
import { AddUserChannelDto } from './dto/add-user-channel.dto';
import mongoose from "mongoose";
import { RemoveUserChannelDto } from './dto/remove-user-channel.dto';
import { ChannelNamesService } from '../../channel-names/channel-names.service';

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
    try {
      const { idUser, channel, nick, desc } = dto
      if (!mongoose.isValidObjectId(idUser)){
        throw new HttpException({
          message: `Ошибка - пользователь с ID #${idUser} не найден!` }, HttpStatus.NOT_FOUND).message;
      }
      const user = await this.userDB.findById(idUser);
      // Проверка наличия пользователя
      if(!user){
        throw new HttpException({
          message: `Ошибка - пользователь с ID #${idUser} не найден!` }, HttpStatus.NOT_FOUND).message;
      }
      // Проверка полей канал и ник
        // поле канал не заполнено
      if (!channel){
        throw new HttpException({
          message: `Ошибка - поле названия канала пусто!` }, HttpStatus.NOT_FOUND).message;
      }
        // поле ник не заполнено
      if (!nick){
        throw new HttpException({
          message: `Ошибка - поле ника пусто!` }, HttpStatus.NOT_FOUND).message;
      }
      for(let i = 0; i < user.channels.length; i++){
        let testCh = await this.userChannelDB.findById(user.channels[i]);
        if (testCh.nick === nick && testCh.channel === channel){
          throw new HttpException({
            message: `Ошибка - канал с таким ником уже есть у данного пользователя!` }, HttpStatus.CONFLICT).message;
        }
      }
      // Проверка имени канала
      const channelName = await this.nameService.findOneName(channel)
      let newChannelName = channelName
      if (!channelName){
        newChannelName = await this.nameService.createName({ name: channel, description: 'создано автоматически' })
      }
      const newDTO = {
        idUser: idUser,
        channel: newChannelName,
        nick: nick,
        description: desc
      }
      // Создание канала
      const newChannel = await new this.userChannelDB({ ...newDTO })
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

  async findChannelByNick(nick: string) {
    try {
      return this.userChannelDB.find({ nick: nick });
    }catch (e) {
      console.log(e)
    }
  }

  async findOneChannelByID(id: ObjectId): Promise<UserChannel> {
    try {
      return this.userChannelDB.findById(id);
    }catch (e) {
      console.log(e)
    }
  }

  async updateChannel(id: ObjectId, dto: UpdateUserChannelDto) {
    try {
      const { channel, nick, desc } = dto;
      const channelName = await this.nameService.findOneName(channel)
      let newChannelName
      if (!channelName && channel.length > 4){
        newChannelName = await this.nameService.createName({ name: channel, description: 'создано автоматически' })
      } else { newChannelName = channelName }
      const updChannel = await this.userChannelDB.findById(id)
      if (!updChannel){
        throw new HttpException({
          message: `Ошибка - канал с ID #${id} не найден!` }, HttpStatus.CONFLICT).message;
      }
      let upChannel = updChannel.channel, upNick = updChannel.nick, upDesc = updChannel.desc;
      if ( channel ){ upChannel = newChannelName.name }
      if ( nick ) { upNick = nick }
      if ( desc ) { upDesc = desc }
      updChannel.$set('channel', upChannel).$set('nick', upNick).$set('desc', upDesc).save()
      return updChannel;
    }catch (e) {
      console.log(e)
    }
  }

  async removeChannel(id: ObjectId, dto: RemoveUserChannelDto) {
    try {
      const { idCreator, desc } = dto
      if (!mongoose.isValidObjectId(idCreator)){
        throw new HttpException({ message: `Удаляющий пользователь с ID ${id} не найден` }, HttpStatus.NOT_FOUND).message;
      }
      if (!mongoose.isValidObjectId(id)){
        throw new HttpException({ message: `Канал с ID ${id} не найден` }, HttpStatus.NOT_FOUND).message;
      }
      const delChannel = await this.userChannelDB.findById(id);
      if (!mongoose.isValidObjectId(delChannel.idUser)){
        throw new HttpException({ message: `Пользователь с ID ${id} не найден` }, HttpStatus.NOT_FOUND).message;
      }
      const user = await this.userDB.findById(delChannel.idUser);
      if (user.channels.indexOf(id) > 0){user.channels.splice( user.channels.indexOf(id), 1 )}

      await user.save().then(() => {
        const trash = new this.trashDB({
          idCreator: idCreator, idUserChannel: delChannel.id,
          channel: delChannel.channel, nick: delChannel.nick, desc: desc })
        trash.save()
      })
      return this.userChannelDB.findByIdAndDelete(id);
    }catch (e) {
      console.log(e)
    }
  }

}
