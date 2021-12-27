import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { RemoveTrashDto } from '../../../comCores/trashs/dto/remove-trash.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Trash, TrashDocument } from '../../../comCores/trashs/entities/trash.entity';
import { SupsService } from '../../sups/sups.service';
import { Package, PackageDocument } from './entities/package.entity';

@Injectable()
export class PackagesService {

  constructor(
    @InjectModel(Package.name) private packagesDB: Model<PackageDocument>,
    @InjectModel(Trash.name)    private trashDB: Model<TrashDocument>,
    private supsService: SupsService
  ) {
  }

  async create(dto: CreatePackageDto) {
    const {idCreator, idOrder, idRecipient, idCity, disPost, postNumber } = dto
    await this.supsService.validateCreator(idCreator)
    const order = await this.supsService.validateOrder(idOrder)
    const recipient = await this.supsService.validateRecipient(idRecipient)
    await this.supsService.validateCity(idCity)
    await this.supsService.validatePost(disPost)
    // console.log(order.idClient, recipient.idClient)
    // if(order.idClient.toString() === recipient.idClient.toString()) {console.log(order.idClient,'=', recipient.idClient)}
    if(order.idClient.toString() != recipient.idClient.toString()) {
      throw new HttpException({ message: `Ошибка - Заказ и получатель не принадлежат одному клиенту!` }, HttpStatus.CONFLICT)
    }
    await this.supsService.validateClient(order.idClient)
    let orderStatus = await this.supsService.validateOrderStatus(order.orderStatus)
    if (order.orderConfirmed === false && order.confirmOrder.length < 10){
      throw new HttpException({ message: `Ошибка - заказ не подтвержден!` }, HttpStatus.CONFLICT)
    }
    if (order.orderCancel != false){
      throw new HttpException({ message: `Ошибка - клиент отказался от заказа, заказ аннулирован!` }, HttpStatus.CONFLICT)
    }
    if(orderStatus._id.toString() === '619bb3e0a618d118bc885b74'){
      throw new HttpException({ message: `Ошибка - заказ не оплачен!` }, HttpStatus.CONFLICT)
    }
    if(orderStatus._id.toString() === '619bb40da618d118bc885b76'){
      throw new HttpException({ message: `Ошибка - заказ уже в отправках!` }, HttpStatus.CONFLICT)
    }
    if(orderStatus._id.toString() === '619bb418a618d118bc885b77'){
      throw new HttpException({ message: `Ошибка - заказ уже отправлен и закрыт!` }, HttpStatus.CONFLICT)
    }
    if(orderStatus._id.toString() === '619caa519b57210e0886a08e'){
      throw new HttpException({ message: `Ошибка - клиент отказался от заказа, заказ аннулирован!` }, HttpStatus.CONFLICT)
    }
    if(orderStatus._id.toString() != '619bb3fea618d118bc885b75'){
      throw new HttpException({ message: `Ошибка определения статуса заказа!` }, HttpStatus.CONFLICT)
    }
    if(disPost.toString() != '61990ad1704c4216d4eb3415' && postNumber <= 0){
      throw new HttpException({ message: `Ошибка - не указано отделение получателя!` }, HttpStatus.CONFLICT)
    }
    let newPackage = await this.packagesDB.create(dto)
    order.$set('orderStatus', '619bb40da618d118bc885b76')
    order.packages.push(newPackage._id)
    order.$set('processDate', Date.now())
    await order.save()
    return newPackage
}

  async findAll() {
    try { return await this.packagesDB.find().exec() } catch (e) { console.log(e) }
  }

  async findOne(id: string) {
    return await this.supsService.validatePackage(id);
  }

  async update(id: string, updatePackageDto: UpdatePackageDto) {
    return `This action updates a #${id} package`;
  }

  async remove(id: string, dto: RemoveTrashDto) {
    const { idCreator, desc } = dto
    // проверки
    await this.supsService.validateDesc(desc)
    let creator = await this.supsService.validateCreator(idCreator)
    let delPackage = await this.supsService.validatePackage(id)
    try {
      const trashPackage = await new this.trashDB({
        idCreator: creator, removeDate: Date.now(), package: Package, desc: desc
      })
      await trashPackage.save() } catch (e) { console.log(e) }
    return await delPackage.remove()
  }
}
