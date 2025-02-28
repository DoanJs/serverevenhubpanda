import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from './Bill.model';
import { BillInput } from './types/bill.input';
import { User } from 'src/users/User.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private billsRepository: Repository<Bill>,
    private dataloaderService: DataLoaderService,
  ) {}

  bills(): Promise<Bill[]> {
    return this.billsRepository.query('select * from Bills');
  }

  getBillConditions(condition: string): Promise<Bill[]> {
    return this.billsRepository.query(
      `select * from Bills where ${condition !== '' ? condition : `BillID != ''`}`,
    );
  }

  async createBill(billInput: BillInput): Promise<Bill> {
    const { createAt, updateAt, price, userBuy, authorEvent, eventBuy } =
      billInput;
    const user = await this.billsRepository.query(
      `select * from Users where UserID = ${userBuy}`,
    );
    const author = await this.billsRepository.query(
      `select * from Users where UserID = ${authorEvent}`,
    );
    const event = await this.billsRepository.query(
      `select * from Events where EventID = ${eventBuy}`,
    );
    const bill = await this.billsRepository.create({
      createAt,
      updateAt,
      price,
      userBuy: user && user[0],
      authorEvent: author && author[0],
      eventBuy: event && event[0],
    });
    await this.billsRepository.save(bill);
    const result = await this.billsRepository.query(
      `select * from Bills where BillID = ${bill.BillID}`,
    );
    return result[0];
  }

  async editBill({
    billInput,
    billId,
  }: {
    billInput: BillInput;
    billId: number;
  }): Promise<Bill> {
    await this.billsRepository.query(
      `update Bills set status = 'success' where BillID = ${billId}`,
    );
    const result = await this.billsRepository.query(
      `select * from Bills where BillID = ${billId}`,
    );
    return result[0];
  }

  // relation

  async userBuy(bill: any): Promise<User> {
    if (bill.userBuyId) {
      return this.dataloaderService.loaderUser.load(bill.userBuyId);
    }
  }

  async authorEvent(bill: any): Promise<User> {
    if (bill.authorEventId) {
      return this.dataloaderService.loaderUser.load(bill.authorEventId);
    }
  }

  async eventBuy(bill: any): Promise<User> {
    if (bill.eventId) {
      return this.dataloaderService.loaderEvent.load(bill.eventId);
    }
  }
}
