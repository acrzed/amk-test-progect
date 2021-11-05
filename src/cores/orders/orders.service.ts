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
import { UsersService } from '../users/users.service';
import { ClientsService } from '../clients/clients.service';



@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Client.name) private clientDB: Model<ClientDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
    @InjectModel(Order.name) private orderDB: Model<OrderDocument>,
    private userService: UsersService,
    private clientService: ClientsService,
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

  async removeOrder(id: Order, dto: RemoveTrashDto): Promise<Client> {
    const { idCreator, desc } = dto
    await this.userService.validateCreator(idCreator)
    let order = await this.validateOrder(id);
    // let order = await this.orderDB.findById(id);
    let client = await this.clientService.validateClient(order.idClient)
    await this.userService.validateDesc(desc)
    let basket = order.basket;
    let delOrderClientIndex = client.orders.indexOf(id);
    if (delOrderClientIndex < 0) {
      throw new HttpException({ message: `Ошибка - у клиента ${client.name} заказ с ID #${id} не найден!` }, HttpStatus.NOT_FOUND);
    }
    client.orders.splice(delOrderClientIndex, 1);

    await this.orderDB.findByIdAndDelete(id);
    client.save()
      .then(() => {
        const trash = new this.trashDB({ ...dto, idClient: client._id, basket: basket });
        trash.save();
      });
    return client;
  }

  findAllOrders() {
    return `This action returns all orders`;
  }

  findOrderByID(id: number) {
    return `This action returns a #${id} order`;
  }

  updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async validateOrder(idOrder: Order){
    if ( !mongoose.isValidObjectId(idOrder) ){  throw new HttpException({ message: `ID удаляемого заказа #${idOrder} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let order
    try { order = await this.orderDB.findById(idOrder) } catch (e) { console.log(e) }
    if ( !order ){ throw new HttpException({ message: `Удаляемый заказ с ID #${idOrder} не найден` }, HttpStatus.NOT_FOUND)}
    return order
  }
}
