import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './user.model';
import { UserCreateDto } from './dto/user-create.dto';

import { RolesService } from '../../comCores/roles/roles.service';
import { RoleAddDto } from './dto/role-add.dto';

import { Depart, DepartDocument } from './departs/depart.model';
import { DepartsService } from './departs/departs.service';
import { DepartUpdateDto } from './dto/depart-update.dto';

import { UserPhone, UserPhoneDocument } from './user-phones/entities/user-phone.entity';
import { UserPhonesService } from './user-phones/user-phones.service';

import { UserChannel, UserChannelDocument } from './user-channels/entities/user-channel.entity';
import { ChannelName, ChannelNameDocument } from '../../comCores/channel-names/entities/channel-name.entity';

import { Trash, TrashDocument } from '../../comCores/trashs/entities/trash.entity';
import { UserChannelsService } from './user-channels/user-channels.service';
import { RemoveTrashDto } from '../../comCores/trashs/dto/remove-trash.dto';
import { Client, ClientDocument } from '../clients/entities/client.entity';
import { SupsService } from '../sups/sups.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userDB: Model<UserDocument>,
    @InjectModel(Client.name) private clientDB: Model<ClientDocument>,
    @InjectModel(Depart.name) private departDB: Model<DepartDocument>,
    @InjectModel(UserPhone.name) private userPhonesDB: Model<UserPhoneDocument>,
    @InjectModel(UserChannel.name) private channelsDB: Model<UserChannelDocument>,
    @InjectModel(ChannelName.name) private channelsNameDB: Model<ChannelNameDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
              private roleService: RolesService,
              private phoneService: UserPhonesService,
              private channelService: UserChannelsService,
              private departService: DepartsService,
              private supsService: SupsService

  ) {}

  async createUser(dto: UserCreateDto): Promise<User> {
    const { name, phone, channel, nick } = dto
    let depart
    try { depart = await this.departService.findByName('Guest')} catch (e) { console.log(e) }
    let roles = ['GUEST']
    let candidate
    try { candidate = await this.userDB.findOne({name: name})} catch (e) { console.log(e) }
    if (candidate) { throw new HttpException({ message: `Ошибка - пользователь - ${candidate.name} уже существует!` }, HttpStatus.CONFLICT); }
    let user
    try {
      user = await new this.userDB({ name: name, depart: depart._id, roles: roles });
      await user.save()
      await this.phoneService.addUserPhone({idUser: user._id, phone: phone, desc: 'добавлен при регистрации'})
      await this.channelService.addUserChannel({idUser: user._id, channel: channel, nick: nick, desc: 'добавлен при регистрации'})
      return await this.getUserByID(user._id)
    } catch (e) { console.log(e) }
}

  async getUserByName(name: string): Promise<User> {
    let user
    try {
      user = await this.userDB.findOne({ name: name })
        .populate('depart')
        .populate('phones')
        .populate('channels');
    }catch (e) {
      console.log(e)
    }
    if ( !user ){ throw new HttpException({ message: `Пользователь с именем ${name} не найден!` }, HttpStatus.NOT_FOUND)}
    return user
  }

  async getUserByID(id: User): Promise<User> {
    return await this.supsService.validateCreator(id)
  }

  async getAllUsers(): Promise<User[]> {
    try { return await this.userDB.find().populate('depart') } catch (e) { console.log(e) }
  }

  async removeUser(id: string, dto: RemoveTrashDto): Promise<User> {
    const { idCreator, desc } = dto
    // проверка ID и наличие пользователей
    if (id === idCreator) { throw new HttpException({ message: `Ошибка - невозможно удалить самого себя!` }, HttpStatus.CONFLICT);}
    // удаляемый
    let user = await this.supsService.validateCreator(id)
    // удаляющий
    await this.supsService.validateCreator(idCreator)
    // причина удаления
    await this.supsService.validateDesc(desc)
    // телефоны
    try { for (let i = 0; i < user.phones.length; i++){
      let delPhone = await this.userPhonesDB.findByIdAndDelete(user.phones[i])
      if(delPhone){
        const trash = new this.trashDB({
          idCreator: idCreator, idUserPhone: delPhone._id,
          phone: delPhone.phone, desc: `Удаление пользователя ${user.name}`,
        });
        await trash.save();
      }
    } } catch (e) { console.log(e) }
    // каналы
    try { for (let i = 0; i < user.channels.length; i++){
      let delChannel = await this.channelsDB.findByIdAndDelete(user.channels[i])
      if(delChannel){
        const trash = new this.trashDB({
          idCreator: idCreator, idUserChannel: delChannel._id, idUser: delChannel.idUser,
          channel: delChannel.channel, nick: delChannel.nick, desc: `Удаление пользователя ${user.name}`,
        });
        await trash.save();
      }
    } } catch (e) { console.log(e) }
    // корзина
    try {
      const trashUser = await new this.trashDB({
        idCreator: idCreator, idUser: id,
        removeDate: Date.now(), roles: user.roles,
        idDepart: user.depart, desc: desc })
      await trashUser.save()
      return await this.userDB.findByIdAndDelete(id)
    }catch (e) {
      console.log(e)
    }
  }

  async addRole(dto: RoleAddDto): Promise<User> {
    if ( !mongoose.isValidObjectId(dto.userId) ){ throw new HttpException({ message: `ID пользователя #${dto.userId} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let user
    try { user = await this.userDB.findById( dto.userId ) } catch (e) { console.log(e) }
    if ( !user ){ throw new HttpException({ message: `Пользователь с ID #${dto.userId} не найден` }, HttpStatus.NOT_FOUND)}
    let role
    if (dto.value){
      try { role = await this.roleService.getRoleByValue(dto.value) } catch (e) { console.log(e) }
      if ( !role ){ throw new HttpException({ message: `Роль ${role} не найдена!` }, HttpStatus.NOT_FOUND)}
    } else {
      try { role = await this.roleService.getRoleByValue('GUEST') } catch (e) { console.log(e) }
    }
    if (role && user) {
      const { value } = role;
      user.roles.push(value);
      try { await user.save(); } catch (e) { console.log(e) }
      console.log(user.roles);
      return user;
    }
    throw new HttpException({ message: 'Не найдена роль или пользователь' }, HttpStatus.NOT_FOUND);

  }

  async updUserDept(dto: DepartUpdateDto): Promise<User> {
    if ( !mongoose.isValidObjectId(dto.userID) ){ throw new HttpException({ message: `ID пользователя #${ dto.userID } не корректен!` }, HttpStatus.BAD_REQUEST)}
    try {
      let user = await this.userDB.findById(dto.userID);
      const dept = await this.departService.findByName(dto.dept);
      if(user && dept){
        user.$set('depart', dept._id)
        await user.save()
        user = await this.userDB.findById(user._id).populate('depart')
        return user
      }
    }catch (e) {
      console.log(e)
    }
    throw new HttpException({ message: `Отдел ${ dto.dept } не найден!` }, HttpStatus.NOT_FOUND)
}








}
