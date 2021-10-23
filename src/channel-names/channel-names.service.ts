import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChannelNameDto } from './dto/create-channel-name.dto';
import { UpdateChannelNameDto } from './dto/update-channel-name.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ChannelName, ChannelNameDocument } from './entities/channel-name.entity';
import { Model, ObjectId } from 'mongoose';
import { RemoveChannelNameDto } from './dto/remove-channel-name.dto';
import * as mongoose from 'mongoose';
import { Trash, TrashDocument } from '../trashs/entities/trash.entity';

@Injectable()
export class ChannelNamesService {

  constructor(
    @InjectModel(ChannelName.name) private nameBD: Model<ChannelNameDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>
  ) {}

  async createName(dto: CreateChannelNameDto) {
    try {
      return await this.nameBD.create(dto)
    }catch (e) {
      console.log(e)
    }
  }

  async findAllNames() {
    try {
      return await this.nameBD.find().exec()
    }catch (e) {
      console.log(e)
    }
  }

  async findOneName(value: string) {
    try {
      return await this.nameBD.findOne({value})
    }catch (e) {
      console.log(e)
    }
  }

  async updateName(dto: UpdateChannelNameDto) {
    try {
      const { name, description } = dto
      const nameUp = await this.nameBD.findOne({name})
      let upName = nameUp.name, upDescription = nameUp.description
      if (name){upName = name}
      if (description){upDescription = description}
      nameUp.$set('name', upName).$set('description', upDescription)
      return nameUp.save()
    }catch (e) {
      console.log(e)
    }
  }

  async removeName(id: ObjectId, dto: RemoveChannelNameDto) {
    try {
      const { idCreator, desc } = dto
      if (!mongoose.isValidObjectId(idCreator)){
        throw new HttpException({ message: `Удаляющий пользователь с ID ${idCreator} не найден` }, HttpStatus.NOT_FOUND).message;
      }
      if (!mongoose.isValidObjectId(id)){
        throw new HttpException({ message: `Имя канала с ID ${id} не найдена` }, HttpStatus.NOT_FOUND).message;
      }
      const name = await this.nameBD.findById(id)
      if (!name){
        throw new HttpException({ message: `Имя канала с ID ${name} не найдена` }, HttpStatus.NOT_FOUND).message;
      }
      const trash = await new this.trashDB({
        idCreator: idCreator, idChannelName: name.id,
        channel: name.name, desc: desc })
      await trash.save()
      return await this.nameBD.findByIdAndDelete(id)
    }catch (e) {
      console.log(e)
    }
  }
}
