import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChannelNameDto } from './dto/create-channel-name.dto';
import { UpdateChannelNameDto } from './dto/update-channel-name.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ChannelName, ChannelNameDocument } from './entities/channel-name.entity';
import { Model, ObjectId } from 'mongoose';
import { RemoveChannelNameDto } from './dto/remove-channel-name.dto';
import * as mongoose from 'mongoose';
import { Trash, TrashDocument } from '../trashs/entities/trash.entity';
import { User, UserDocument } from '../../cores/users/user.model';

@Injectable()
export class ChannelNamesService {

  constructor(
    @InjectModel(ChannelName.name) private nameBD: Model<ChannelNameDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
    @InjectModel(User.name) private userDB: Model<UserDocument>
  ) {}

  async createName(dto: CreateChannelNameDto) {
    const { name } = dto
    let candi
    try { candi = await this.findOneName( name ) } catch (e) { console.log(e) }
    if ( candi ) { throw new HttpException({ message: `Канал с именем - ${name} уже существует` }, HttpStatus.CONFLICT); }
    try { return await this.nameBD.create(dto) } catch (e) { console.log(e) }
  }

  async findAllNames() {
    try { return await this.nameBD.find().exec()  } catch (e) { console.log(e) } }

  async findOneName(name: string) {
    let fName
    try { fName = await this.nameBD.findOne({name: name}) } catch (e) { console.log(e) }
    if (!fName){ throw new HttpException({ message: `Имя канала ${name} не найдено` }, HttpStatus.NOT_FOUND)}
    return fName
  }

  async updateName(id: ObjectId, dto: UpdateChannelNameDto) {
    const { name, description } = dto
    if( !mongoose.isValidObjectId(id) ) {
      throw new HttpException({ message: `Ошибка - ID #${id} не корректен!` }, HttpStatus.NOT_FOUND);
    }
    let updateName
    try { updateName = await this.nameBD.findById(id) } catch (e) { console.log(e) }
    if ( !updateName ) { throw new HttpException({ message: `Имя канала с ID #${id} не найдено!` }, HttpStatus.NOT_FOUND); }
    let newName = updateName.name, newDescription = updateName.description
    if ( name ) { newName = name }
    if ( description ) { newDescription = description }
    try {
      updateName.$set('name', newName).$set('description', newDescription)
      return updateName.save()
    } catch (e) { console.log(e) }
  }

  async removeName(id: ObjectId, dto: RemoveChannelNameDto) {
    const { idCreator, desc } = dto;
    if ( !mongoose.isValidObjectId(idCreator) ){
      throw new HttpException({ message: `ID удаляющего пользователя #${idCreator} не корректен!` }, HttpStatus.BAD_REQUEST)
    }
    let creator
    try { creator = await this.userDB.findById( idCreator ) } catch (e) { console.log(e) }
    if ( !creator ){ throw new HttpException({ message: `Удаляющий пользователь с ID #${idCreator} не найден` }, HttpStatus.NOT_FOUND)}
    if ( !mongoose.isValidObjectId( id ) ){ throw new HttpException({ message: `ID канала #${id} не корректен!` }, HttpStatus.BAD_REQUEST);}
    let delName
    try { delName = await this.nameBD.findById( id ) } catch (e) { console.log(e) }
    if ( !delName ){ throw new HttpException({ message: `Канал с ID #${id} не найден` }, HttpStatus.NOT_FOUND);}
    if ( !desc ){ throw new HttpException({ message: `Необходимо указать причину удаления` }, HttpStatus.BAD_REQUEST);}
    try {
      const trash = await new this.trashDB({
        idCreator: idCreator, idChannelName: delName.id,
        channel: delName.name, desc: desc })
      await trash.save()
      return await this.nameBD.findByIdAndDelete(id) } catch (e) { console.log(e) }
  }
}
