import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Trash, TrashDocument } from '../../../../comCores/trashs/entities/trash.entity';
import { SupsService } from '../../../sups/sups.service';
import { City, CityDocument } from './entities/city.entity';
import { RemoveTrashDto } from '../../../../comCores/trashs/dto/remove-trash.dto';

@Injectable()
export class CitiesService {

  constructor(
    @InjectModel(City.name) private cityDB: Model<CityDocument>,
    @InjectModel(Trash.name)    private trashDB: Model<TrashDocument>,
    private supsService: SupsService) {}

  async create(dto: CreateCityDto): Promise<City> {
    const { city, ref } = dto
    // проверка DTO
    if (!city){ throw new HttpException({ message: `Ошибка - название города не заполнено!` }, HttpStatus.NOT_FOUND); }
    if (await this.cityDB.findOne({ city: city})) {throw new HttpException({ message: `Ошибка - такой город уже зарегистрирован!` }, HttpStatus.CONFLICT);}
    if(!ref){
      let generateSafeId = require('generate-safe-id');
      const id = generateSafeId();
      return await this.cityDB.create({ ...dto, ref: id }) }
    return await this.cityDB.create(dto);
  }

  async findAll(): Promise<City[]> {
   try { return await this.cityDB.find().exec() } catch (e) { console.log(e) }
  }

  async findOne(id: string): Promise<City> {
    return await this.supsService.validateCity(id);
  }

  async update(id: string, dto: UpdateCityDto): Promise<City> {
    const { city, ref, desc } = dto
    let upCity = await this.supsService.validateCity(id)
    if(await this.cityDB.findOne({city: city})){
      throw new HttpException({ message: `Ошибка - такой город уже зарегистрирован!` }, HttpStatus.CONFLICT)
    }
    let pCity = city ? city : upCity.city, pRef = ref ? ref : upCity.ref, pDesc = desc ? desc : upCity.desc
    return await upCity
      .$set('city', pCity)
      .$set('ref', pRef)
      .$set('desc', pDesc)
      .save()
  }

  async remove(id: string, @Body() dto: RemoveTrashDto): Promise<City> {
    const { idCreator, desc } = dto
    // проверки
    await this.supsService.validateDesc(desc)
    let creator = await this.supsService.validateCreator(idCreator)
    let delCity = await this.supsService.validateCity(id)
    try {
      const trashCity = await new this.trashDB({
        idCreator: creator, removeDate: Date.now(), city: delCity, desc: desc
      })
      await trashCity.save() } catch (e) { console.log(e) }
    return await delCity.remove()
  }
}
