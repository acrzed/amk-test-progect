import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.model';
import { Order, OrderDocument } from './entities/order.entity';
import { Client, ClientDocument } from '../clients/entities/client.entity';
import { UsersService } from '../users/users.service';


@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(User.name) private userDB:Model<UserDocument>,
    @InjectModel(Order.name) private orderDB:Model<OrderDocument>,
    @InjectModel(Client.name) private clientDB:Model<ClientDocument>,
    private userService: UsersService
  ) {
  }

//'This action adds a new order'
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { idCreator } = createOrderDto;
    const { idClient } = createOrderDto;
    if (this.userService.checkId(idClient) && this.userService.checkId(idCreator)){
      const { orderSum } = createOrderDto;
      const { orderSale } = createOrderDto;
      let total: number = +orderSum;
      const { indPay } = createOrderDto;
      if (indPay){
        total = total + +indPay;
      }
      if (orderSale){
        total = total - +orderSale
      }
      const order = new this.orderDB({ ...createOrderDto, orderTotal: total });
      await order.save()
      return order;
    }

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

  removeOrder(id: number) {
    return `This action removes a #${id} order`;
  }
}
