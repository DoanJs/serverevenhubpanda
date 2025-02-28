import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from 'src/users/User.model';
import { Bill } from './Bill.model';
import { BillsService } from './Bills.service';
import { BillInput } from './types/bill.input';

@Resolver(() => Bill)
export class BillsResolver {
  constructor(private billsService: BillsService) {}

  @Query(() => [Bill])
  bills(): Promise<Bill[]> {
    return this.billsService.bills();
  }

  @Query(() => [Bill])
  getBillConditions(
    @Args('condition') condition: string
  ): Promise<Bill[]> {
    return this.billsService.getBillConditions(condition);
  }

  @Mutation(() => Bill)
  createBill(@Args('billInput') billInput: BillInput): Promise<Bill> {
    return this.billsService.createBill(billInput);
  }

  @Mutation(() => Bill)
  editBill(
    @Args('billId') billId: number,
    @Args('billInput') billInput: BillInput,
  ): Promise<Bill> {
    return this.billsService.editBill({ billInput, billId });
  }

  // relation
  @ResolveField(() => User)
  userBuy(@Parent() bill: Bill): Promise<User> {
    return this.billsService.userBuy(bill);
  }

  @ResolveField(() => User)
  authorEvent(@Parent() bill: Bill): Promise<User> {
    return this.billsService.authorEvent(bill);
  }

  @ResolveField(() => User)
  eventBuy(@Parent() bill: Bill): Promise<User> {
    return this.billsService.eventBuy(bill);
  }
}
