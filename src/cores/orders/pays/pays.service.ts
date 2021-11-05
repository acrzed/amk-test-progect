import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import * as mongoose from 'mongoose';

import { User, UserDocument } from '../../users/user.model';
import { Client, ClientDocument } from '../../clients/entities/client.entity';
import { Pay } from './entities/pay.entity';
import { Trash, TrashDocument } from '../../../comCores/trashs/entities/trash.entity';

import { CreatePayDto } from './dto/create-pay.dto';
import { UpdatePayDto } from './dto/update-pay.dto';
import { RemoveTrashDto } from '../../../comCores/trashs/dto/remove-trash.dto';
import { UsersService } from '../../users/users.service';
import { ClientsService } from '../../clients/clients.service';


@Injectable()
export class PaysService {
  constructor(
    @InjectModel(Client.name) private clientDB: Model<ClientDocument>,
    @InjectModel(User.name) private userDB: Model<UserDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
    @InjectModel(Pay.name) private payDB: Model<TrashDocument>,
    private userService: UsersService,
    private clientService: ClientsService,
  ) {
  }

  create(createPayDto: CreatePayDto) {
    return 'This action adds a new pay';
  }

  findAll() {
    return `This action returns all pays`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pay`;
  }

  update(id: number, updatePayDto: UpdatePayDto) {
    return `This action updates a #${id} pay`;
  }

  async remove(id: Pay, dto: RemoveTrashDto): Promise<Pay> {
    const { idCreator, desc } = dto
    let creator = await this.userService.validateCreator(idCreator)
    let pay = await this.validatePay(id)
    let client = await this.clientService.validateClient(pay.idClient)
    // нет корзины - trash
    return pay;
  }
  async validatePay(id: Pay) {
    if ( !mongoose.isValidObjectId(id) ){  throw new HttpException({ message: `ID удаляемой оплаты #${id} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let pay
    try { pay = await this.payDB.findById(id) } catch (e) { console.log(e) }
    if ( !pay ){ throw new HttpException({ message: `Удаляемая оплата с ID #${id} не найдена` }, HttpStatus.NOT_FOUND)}
    return pay
  }
}
