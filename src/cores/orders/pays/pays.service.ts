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
    await this.supsService.validateDTO(dto, 6)
    const { idCreator, idOrder, payDate, payTime, paySum} = dto
    // проверка исходны данных
    await this.supsService.validateCreator(idCreator)
    let order = await this.supsService.validateOrder(idOrder, 0)
    const pDate = await this.supsService.stringToDate(payDate, payTime)
    // проверка оплаты
    const payHash = await this.supsService.validatePayHash(idOrder, pDate, paySum)
    let pay = await this.payDB.create({...dto, payHash: payHash, payDateTime: pDate})
    order.pays.push(pay.id)
    order.save()
    return pay
  }

  async findAll(): Promise<Pay[]> {
    try { return await this.payDB.find().exec() } catch (e) { console.log(e) } }

  async findByID(id: string): Promise<Pay> {
    return await this.supsService.validatePay(id)
  }

  async update(id: string, dto: UpdatePayDto): Promise<Pay> {
    const { payDate, payTime, paySum, desc } = dto
    let pay = await this.supsService.validatePay(id);
    let pDate = pay.payDateTime, pHash = pay.payHash, pSum = pay.paySum, pDesc = !pay.desc ? "" : pay.desc
    if (payDate && payTime){pDate = await this.supsService.stringToDate(payDate, payTime)}
    if (paySum){pSum = paySum}
    if (desc){pDesc = desc}
    if (payDate && payTime || paySum){
      pHash = await this.supsService.validatePayHash(pay.idOrder, pDate, paySum)}
    pay
      .$set('payDateTime', pDate)
      .$set('paySum', pSum)
      .$set('payHash', pHash)
      .$set('desc', pDesc)
    return await pay.save()
  }

  async remove(id: string, dto: RemoveTrashDto): Promise<Pay> {
    const { idCreator, desc } = dto
    let pay = await this.supsService.validatePay(id)
    await this.supsService.validateDesc(desc)
    let creator = await this.supsService.validateCreator(idCreator)
    let order = await this.supsService.validateOrder(pay.idOrder, 0)
    try {
      if (order.pays.indexOf(id) != -1){
        await order.pays.splice(order.pays.indexOf(id), 1)
        await order.save();
      } }  catch (e) { console.log(e) }
    try {
      const trashPay = await new this.trashDB({
        idCreator: creator, removeDate: Date.now(), pay: pay, desc: desc
      })
      await trashPay.save() } catch (e) { console.log(e) }
    return await pay.remove();
  }

}
