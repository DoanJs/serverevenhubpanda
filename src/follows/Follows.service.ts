import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './Follow.model';
import { FollowInput } from './types/Follow.input';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follow)
    private followRepository: Repository<Follow>,
  ) {}

  follows(): Promise<Follow[]> {
    return this.followRepository.query('select * from Follows');
  }

  async editFollow({
    type,
    followInput,
  }: {
    type: string;
    followInput: FollowInput;
  }): Promise<string> {
    const { followerId, followingId } = followInput;
    try {
      if (type === 'delete') {
        await this.followRepository.query(`
      delete from Follows where followerId = ${followerId} and followingId = ${followingId}
      `);
      } else {
        await this.followRepository.query(`
      insert into Follows (followerId, followingId) values (${followerId}, ${followingId})
      `);
      }

      return type === 'insert'
        ? 'Update follow completed !'
        : 'Delete follow completed !';
    } catch (error) {
      throw new UnauthorizedException('Delete/update follow error !');
    }
  }

  // relation
}
