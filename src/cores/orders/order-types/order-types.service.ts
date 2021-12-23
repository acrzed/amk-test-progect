import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { UpdateOrderTypeDto } from './dto/update-order-type.dto';
import { RemoveTrashDto } from '../../../comCores/trashs/dto/remove-trash.dto';
import { OrderType, OrderTypeDocument } from './entities/order-type.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Trash, TrashDocument } from '../../../comCores/trashs/entities/trash.entity';
import { SupsService } from '../../sups/sups.service';

@Injectable()
export class OrderTypesService {

  constructor(
    @InjectModel(OrderType.name) private orderTypeDB: Model<OrderTypeDocument>,
    @InjectModel(Trash.name)    private trashDB: Model<TrashDocument>,
    private supsService: SupsService) {}

  async create(dto: CreateOrderTypeDto): Promise<OrderType> {
    const {orderType} = dto
    if(!orderType){ throw new HttpException({ message: `Ошибка - название типа заказа пусто!` }, HttpStatus.NOT_FOUND); }
    if (await this.orderTypeDB.findOne({orderType: orderType})) {throw new HttpException({ message: `Ошибка - такой тип уже зарегистрирован!` }, HttpStatus.CONFLICT);}
    return await this.orderTypeDB.create(dto);
  }

  async findAll(): Promise<OrderType[]>  {
    try { return await this.orderTypeDB.find().exec() } catch (e) { console.log(e) }
  }

  async findOne(id: string): Promise<OrderType>  {
    return await this.supsService.validateOrderType(id);
  }

  async update(id: string, dto: UpdateOrderTypeDto): Promise<OrderType>  {
    const { orderType } = dto
    if(!orderType){ throw new HttpException({ message: `Ошибка - название типа заказа пусто!` }, HttpStatus.NOT_FOUND); }
    if (await this.orderTypeDB.findOne({orderType: orderType})) {throw new HttpException({ message: `Ошибка - такой тип уже зарегистрирован!` }, HttpStatus.CONFLICT);}
    let upType = await this.supsService.validateOrderType(id)
    await upType.updateOne(dto)
    return await this.supsService.validateOrderType(id)
  }

  async remove(id: string, dto: RemoveTrashDto): Promise<OrderType> {
    const { idCreator, desc } = dto
    // проверки
    await this.supsService.validateDesc(desc)
    let creator = await this.supsService.validateCreator(idCreator)
    let delType = await this.supsService.validateOrderType(id)
    try {
      const trashType = await new this.trashDB({
        idCreator: creator, removeDate: Date.now(), orderType: delType, desc: desc
      })
      await trashType.save() } catch (e) { console.log(e) }
      return await delType.remove()
  }
}
