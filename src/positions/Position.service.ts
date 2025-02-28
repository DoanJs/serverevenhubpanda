import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './Position.model';
import { ParamsInput } from 'src/utils/types/Params.input';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  toRoad(val: number) {
    return (val * Math.PI) / 180;
  }

  calcDistanceLocation({
    currentLat,
    currentLong,
    addressLat,
    addressLong,
  }: {
    currentLat: number;
    currentLong: number;
    addressLat: number;
    addressLong: number;
  }) {
    const r = 6371;
    const dLat = this.toRoad(addressLat - currentLat);
    const dLon = this.toRoad(addressLong - currentLong);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(this.toRoad(currentLat)) *
        Math.cos(this.toRoad(addressLat));
    return r * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  async positions(paramsInput: ParamsInput): Promise<Position[]> {
    const { skip, take, data } = paramsInput;
    const result = await this.positionRepository.find({
      skip: skip ?? 0,
      take,
    });

    const items = [];
    if (result.length > 0) {
      result.forEach((position) => {
        const eventDistance = this.calcDistanceLocation({
          currentLat: data.lat,
          currentLong: data.long,
          addressLat: position.lat,
          addressLong: position.lng,
        });

        console.log(eventDistance);
        if (eventDistance < data.distance) {
          items.push(position);
        }
      });
    }

    console.log(items.length);
    return this.positionRepository.query('select * from Positions');
  }

  // relation
}
