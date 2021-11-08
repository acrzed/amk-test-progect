import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import { Client, ClientDocument } from '../clients/entities/client.entity';
import { Order, OrderDocument } from './entities/order.entity';
import { AddOrderDto } from './dto/add-order.dto';
import { Trash, TrashDocument } from '../../comCores/trashs/entities/trash.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RemoveTrashDto } from '../../comCores/trashs/dto/remove-trash.dto';
import { User, UserDocument } from '../users/user.model';
import { SupsService } from '../sups/sups.service';


@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(User.name) private userDB: Model<UserDocument>,
    @InjectModel(Client.name) private clientDB: Model<ClientDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
    @InjectModel(Order.name) private orderDB: Model<OrderDocument>,
    private supsService: SupsService,
  ) {
  }

  async addOrder(dto: AddOrderDto): Promise<Client> {
    const { orderSum, indPay, orderSale, idClient } = dto;
    const client = await this.clientDB.findById(idClient);
    let total: number = +orderSum;
    if (indPay) {
      total = total + +indPay;
    }
    if (orderSale) {
      total = total - +orderSale;
    }
    const order = new this.orderDB({ ...dto, orderTotal: total });
    client.orders.push(order._id);

    await order.save().then(() => {
      client.save();
    });
    return client;
  }

  async findAllOrders(): Promise<Order[]> {
    try { return await this.orderDB.find().exec(); } catch (e) { console.log(e) }
}

  async findOrderByID(id: Order): Promise<Order> {
    try { return await this.supsService.validateOrder(id); } catch (e) { console.log(e) }
  }

  async updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async removeOrder(id: Order, dto: RemoveTrashDto): Promise<Client> {
    const { idCreator, desc } = dto;
    await this.supsService.validateCreator(idCreator);
    await this.supsService.validateDesc(desc);
    let order = await this.supsService.validateOrder(id);
    let client = await this.clientDB.findById(order.idClient);
    let basket = order.basket;
    let delOrderClientIndex = client.orders.indexOf(id);
    if (delOrderClientIndex < 0) {
      throw new HttpException({ message: `Ошибка - у клиента ${client.name} заказ с ID #${id} не найден!` }, HttpStatus.NOT_FOUND);
    }
    client.orders.splice(delOrderClientIndex, 1);
    await this.orderDB.findByIdAndDelete(id);
    client.save()
      .then(() => {
        const trash = new this.trashDB({ ...dto, idClient: client._id, order: order, basket: basket });
        trash.save();
      });
    return client;
  }

}
