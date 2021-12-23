import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderStatDto } from './dto/create-order-stat.dto';
import { UpdateOrderStatDto } from './dto/update-order-stat.dto';
import { RemoveTrashDto } from '../../../comCores/trashs/dto/remove-trash.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Trash, TrashDocument } from '../../../comCores/trashs/entities/trash.entity';
import { SupsService } from '../../sups/sups.service';
import { OrderStat, OrderStatDocument } from './entities/order-stat.entity';

@Injectable()
export class OrderStatsService {

  constructor(
    @InjectModel(OrderStat.name) private orderStatDB: Model<OrderStatDocument>,
    @InjectModel(Trash.name)    private trashDB: Model<TrashDocument>,
    private supsService: SupsService) {}

  async create(createOrderStatDto: CreateOrderStatDto) {
    const { status } = createOrderStatDto
    if(!status){ throw new HttpException({ message: `Ошибка - название статуса заказа пусто!` }, HttpStatus.NOT_FOUND); }
    if (await this.orderStatDB.findOne({status: status})) {throw new HttpException({ message: `Ошибка - такой статус уже зарегистрирован!` }, HttpStatus.CONFLICT);}
    return await this.orderStatDB.create(createOrderStatDto);
  }

  async findAll() {
    try { return await this.orderStatDB.find().exec() } catch (e) { console.log(e) }
  }

  async findOne(id: string) {
    return await this.supsService.validateOrderStatus(id);
  }

  async update(id: string, dto: UpdateOrderStatDto) {
    const { status } = dto
    if(!status){ throw new HttpException({ message: `Ошибка - название типа заказа пусто!` }, HttpStatus.NOT_FOUND); }
    if (await this.orderStatDB.findOne({type: status})) {throw new HttpException({ message: `Ошибка - такой тип уже зарегистрирован!` }, HttpStatus.CONFLICT);}
    let upStatus = await this.supsService.validateOrderType(id)
    return await upStatus.update(dto)
  }

  async remove(id: string, dto: RemoveTrashDto) {
    const { idCreator, desc } = dto
    // проверки
    await this.supsService.validateDesc(desc)
    let creator = await this.supsService.validateCreator(idCreator)
    let delStatus = await this.supsService.validateOrderStatus(id)
    try {
      const trashStatus = await new this.trashDB({
        idCreator: creator, removeDate: Date.now(), orderType: delStatus, desc: desc
      })
      await trashStatus.save() } catch (e) { console.log(e) }
    return await delStatus.remove()
  }
}
