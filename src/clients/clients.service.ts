import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AddPhoneDto } from './dto/add-phone.dto';
import { RemovePhoneDto } from './dto/remove-phone.dto';
import { Channel, ChannelDocument } from './entities/channel.entity';
import { AddChannelDto } from './dto/add-channel.dto';
import { Order, OrderDocument } from './orders/entities/order.entity';
import { Trash, TrashDocument } from '../trashs/entities/trash.entity';
import { RemoveChannelDto } from './dto/remove-channel.dto';


@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientDB: Model<ClientDocument>,
    @InjectModel(Channel.name) private channelDB: Model<ChannelDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
    @InjectModel(Order.name) private ordertDB: Model<OrderDocument>
  ) {
  }

  //'This action adds a new client';
  async create(createClientDto: CreateClientDto) {
    try {
      const client = await new this.clientDB(createClientDto);
      const { phone } = createClientDto;
      const newPhone = []
      newPhone.push(phone)
      client.$set('phone', newPhone);
      return client.save();

    }catch (e) {
      console.log(e)
    }

  }

  async findAll() {
    return await this.clientDB.find().exec()
    //`This action returns all clients`;
  }
//`This action returns a #${id} client`
  async findOne(id: string) {
    try {
      if(id.length === 24){
        const client = await this.clientDB.findById( id )
          .populate('channel')
          .populate('order');
        if(client){
          return client
        }
        return `Клиент с ID #${id} не найден`;
      }
      throw new HttpException({ message: 'Пользователь не найден' }, HttpStatus.NOT_FOUND);
    }catch (e) {
      console.log(e)
    }
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  // `This action removes a #${id} client`
  async removeClient(id: string) {
    try {
      if(id.length === 24){
        const client = await this.clientDB.findByIdAndDelete( id );
        if(client){
          return `Клиент ${client.name} с ID #${client._id} удалён`
        }
        return `Клиент с ID #${id} не найден`;
      }
      throw new HttpException({ message: 'Клиент не найден' }, HttpStatus.NOT_FOUND);
    }catch (e) {
      console.log(e)
    }
  }

  async addClientPhone(dto: AddPhoneDto){
    const { idClient } = dto
    const client = await this.clientDB.findById( idClient )
    const { phone } = dto;
    if(client && phone){
      const newArrPhone = [];
      for (let i = 0; i < client.phone.length; i++){
        if (client.phone[i] != phone){
          newArrPhone.push(client.phone[i]);
        }
      }
      newArrPhone.push(phone)
      client.$set('phone', newArrPhone);
      client.save()
      return client
    }
    return `Клиент с ID #${idClient} не найден`
  }

  async removeClientPhone(removePhoneDto: RemovePhoneDto){
    const { idClient } = removePhoneDto
    const client = await this.clientDB.findById( idClient )
    const { phone } = removePhoneDto;
    const ar = client.phone.length
    if(client && phone){
      const newArrPhone = [];
      for (let i = 0; i < client.phone.length; i++){
        if (client.phone[i] != phone){
          newArrPhone.push(client.phone[i]);
        }
      }
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
    client.channel.push(channel._id)
    await client.save()
    return client
  }

  async removeChannel(dto: RemoveChannelDto): Promise<Client>{
    try {
      const { idChannel } = dto;
      let channel = await this.channelDB.findById(idChannel);
      const client = await this.clientDB.findById(channel.idClient);
      let delChannelClientIndex = client.channel.indexOf(channel)
      if (delChannelClientIndex < 0){
        throw new HttpException({ message: `Ошибка - у клиента ${client.name} канал с ID #${idChannel} не найден!` }, HttpStatus.NOT_FOUND);
      }
      client.channel.splice(delChannelClientIndex, 1);

      await this.channelDB.findByIdAndDelete(idChannel);
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

}



