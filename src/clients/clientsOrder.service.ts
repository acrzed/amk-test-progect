import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './entities/client.entity';
import { Channel, ChannelDocument } from './entities/channel.entity';
import { Order, OrderDocument } from '../orders/entities/order.entity';
import { AddOrderDto } from './dto/add-order.dto';
import { Trash, TrashDocument } from './entities/trash.entity';
import { RemoveOrderDto } from './dto/remove-order.dto';
import { OrdersService } from '../orders/orders.service';


@Injectable()
export class ClientsOrderService {
  constructor(
    @InjectModel(Client.name) private clientDB: Model<ClientDocument>,
    @InjectModel(Channel.name) private channelDB: Model<ChannelDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
    @InjectModel(Order.name) private ordertDB: Model<OrderDocument>,
    private orderService: OrdersService,
  ) {
  }

  async addOrder(dto: AddOrderDto): Promise<Client> {
    const client = await this.clientDB.findById(dto.idClient);
    const { orderSum } = dto;
    const { indPay } = dto;
    const { orderSale } = dto;
    let total: number = +orderSum;
    if (indPay) {
      total = total + +indPay;
    }
    if (orderSale) {
      total = total - +orderSale;
    }
    const order = new this.ordertDB({ ...dto, orderTotal: total });
    client.order.push(order._id);

    await order.save().then(() => {
      client.save();
    });
    return client;
  }

  async removeOrder(dto: RemoveOrderDto): Promise<Client> {
    const { idOrder } = dto;
    let order = await this.ordertDB.findById(idOrder);
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

    await this.ordertDB.findByIdAndDelete(idOrder);
    client.save()
      .then(() => {
        const trash = new this.trashDB({ ...dto, idClient: idClient, basket: basket });
        trash.save();
      });
    return client;
  }
}



