import { Injectable } from '@nestjs/common';
import { CreateOrderStatDto } from './dto/create-order-stat.dto';
import { UpdateOrderStatDto } from './dto/update-order-stat.dto';

@Injectable()
export class OrderStatsService {
  create(createOrderStatDto: CreateOrderStatDto) {
    return 'This action adds a new orderStat';
  }

  findAll() {
    return `This action returns all orderStats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderStat`;
  }

  update(id: number, updateOrderStatDto: UpdateOrderStatDto) {
    return `This action updates a #${id} orderStat`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderStat`;
  }
}
