import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from '../entities/client.entity';
import { Order, OrderDocument } from './entities/order.entity';
import { AddOrderDto } from './dto/add-order.dto';
import { Trash, TrashDocument } from '../../trashs/entities/trash.entity';
import { RemoveOrderDto } from './dto/remove-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';


@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Client.name) private clientDB: Model<ClientDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
    @InjectModel(Order.name) private orderDB: Model<OrderDocument>
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
    client.order.push(order._id);

    await order.save().then(() => {
      client.save();
    });
    return client;
  }

  async removeOrder(dto: RemoveOrderDto): Promise<Client> {
    const { idOrder } = dto;
    let order = await this.orderDB.findById(idOrder);
    if (!order) {
      throw new HttpException({ message: `Ошибка - заказ с ID #${idOrder} не найден!` }, HttpStatus.NOT_FOUND);
    }
    let idClient = order.idClient;
    let basket = order.basket;
    const client = await this.clientDB.findById(idClient);
    let delOrderClientIndex = client.order.indexOf(idOrder);
    if (delOrderClientIndex < 0) {
      throw new HttpException({ message: `Ошибка - у клиента ${client.name} заказ с ID #${idOrder} не найден!` }, HttpStatus.NOT_FOUND);
    }
    client.order.splice(delOrderClientIndex, 1);

    await this.orderDB.findByIdAndDelete(idOrder);
    client.save()
      .then(() => {
        const trash = new this.trashDB({ ...dto, idClient: idClient, basket: basket });
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
}
