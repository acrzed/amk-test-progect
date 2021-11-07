import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
// import * as mongoose from 'mongoose';
//
// import { User, UserDocument } from '../../users/user.model';
// import { Client, ClientDocument } from '../../clients/entities/client.entity';
import { Pay, PayDocument } from './entities/pay.entity';
import { Trash, TrashDocument } from '../../../comCores/trashs/entities/trash.entity';

import { CreatePayDto } from './dto/create-pay.dto';
import { UpdatePayDto } from './dto/update-pay.dto';
import { RemoveTrashDto } from '../../../comCores/trashs/dto/remove-trash.dto';

import { SupsService } from '../../sups/sups.service';


@Injectable()
export class PaysService {
  constructor(
    // @InjectModel(Client.name)   private clientDB: Model<ClientDocument>,
    // @InjectModel(User.name)     private userDB: Model<UserDocument>,
    @InjectModel(Trash.name)    private trashDB: Model<TrashDocument>,
    @InjectModel(Pay.name)      private payDB: Model<PayDocument>,
                                private supsService: SupsService
  ) {
  }

  async create(dto: CreatePayDto): Promise<Pay> {
    // проверка DTO
    await this.supsService.validateDTO(dto, 7)
    const { idCreator, idClient, idOrder, payDate, payTime, paySum, createDate } = dto
    // проверка исходны данных
    await this.supsService.validateCreator(idCreator)
    await this.supsService.validateClient(idClient)
    await this.supsService.validateOrder(idOrder)
    const pDate = await this.supsService.stringToDate(payDate, payTime)
    // проверка оплаты
    const payHash = await this.supsService.validatePayHash(idOrder, payDate, payTime, paySum)
    return await this.payDB.create({...dto, payHash: payHash, payDateTime: pDate})
  }

  async findAll() {
    return this.supsService.stringToDate("21.12.2021", "23:45");
  }

  async findOne(id: number) {
    return `This action returns a #${id} pay`;
  }

  async update(id: number, updatePayDto: UpdatePayDto) {
    return `This action updates a #${id} pay`;
  }

  async remove(id: Pay, dto: RemoveTrashDto): Promise<Pay> {
    const { idCreator, desc } = dto
    let creator = await this.supsService.validateCreator(idCreator)
    let pay = await this.supsService.validatePay(id)
    let client = await this.supsService.validateClient(pay.idClient)
    // нет корзины - trash
    return pay;
  }

}
