import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParamsInput } from 'src/utils/types/Params.input';
import { Repository } from 'typeorm';
import { FCMToken } from './FCMToken.model';

@Injectable()
export class FCMTokensService {
  constructor(
    @InjectRepository(FCMToken)
    private fcmtokenRepository: Repository<FCMToken>,
  ) {}

  fcmtokens(paramsInput: ParamsInput): Promise<FCMToken[]> {
    console.log(paramsInput);
    return;
  }

  async createFCMToken({
    userId,
    FCMToken,
  }: {
    userId: number;
    FCMToken: string;
  }): Promise<string> {
    await this.fcmtokenRepository.query(
      `insert into FCMTokens ( userId, FCMToken ) values (${userId}, ${FCMToken})`,
    );

    return 'create FCMToken complete !';
  }
  // relation
}
