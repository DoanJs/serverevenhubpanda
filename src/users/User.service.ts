import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { FCMToken } from 'src/fcmtokens/FCMToken.model';
import { Repository } from 'typeorm';
import { FollowEventInput } from './type/followEvent.input';
import { UserInput } from './type/user.input';
import { User } from './User.model';
import { UserCategoryInput } from './type/userCategory.input';
import { Bill } from 'src/bills/Bill.model';
import { Review } from 'src/reviews/Review.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataloaderService: DataLoaderService,
  ) {}

  users(): Promise<User[]> {
    return this.userRepository.query('select * from Users');
  }

  async getUserId(userId: number): Promise<User> {
    const data = await this.userRepository.query(
      `select * from Users where UserID = ${userId}`,
    );
    return data[0];
  }

  async user(email: string): Promise<User> {
    const data = await this.userRepository.query(
      `select * from Users where Email = '${email}'`,
    );
    return data[0];
  }

  async editUser({
    userId,
    userInput,
  }: {
    userId: number;
    userInput: UserInput;
  }): Promise<User> {
    await this.userRepository.query(
      `update Users set Username = '${userInput.Username}', PhotoUrl = '${userInput.PhotoUrl}' where UserID = ${userId}`,
    );
    const result = await this.userRepository.query(
      `select * from Users where UserID = ${userId}`,
    );
    return result[0];
  }

  async editFollowEvent({
    type,
    followEventInput,
  }: {
    type: string;
    followEventInput: FollowEventInput;
  }): Promise<string> {
    const { UserID, EventID } = followEventInput;
    try {
      if (type === 'delete') {
        await this.userRepository.query(`
      delete from Events_Followers where UserID = ${UserID} and EventID =${EventID}
      `);
      } else {
        await this.userRepository.query(`
      insert into Events_Followers (UserID, EventID) values (${UserID}, ${EventID})
      `);
      }

      return type === 'insert'
        ? 'Update follower completed !'
        : 'Delete follower completed !';
    } catch (error) {
      throw new UnauthorizedException('Delete/update follower error !');
    }
  }

  async editInterests({
    userId,
    interests,
  }: {
    userId: number;
    interests: UserCategoryInput[];
  }): Promise<string> {
    await this.userRepository.query(
      `delete from Categories_Users where UserID = ${userId}`,
    );

    const result = interests.map(async (item) => {
      await this.userRepository.query(
        `insert into Categories_Users (UserID, CategoryID) values (${item.UserID}, ${item.CategoryID})`,
      );
    });
    await Promise.resolve(result);
    return 'Update interests compelte !';
  }

  async createEventUser({
    userId,
    eventId,
  }: {
    userId: number;
    eventId: number;
  }): Promise<string> {
    let result: string = '';
    const eventUser = await this.userRepository.query(
      `select * from Events_Users where UserID = ${userId} and EventID = ${eventId}`,
    );
    const user = await this.getUserId(userId);
    const event = await this.userRepository.query(
      `select * from Events where EventID = ${eventId}`,
    );

    if (user && event[0]) {
      if (eventUser && eventUser.length > 0) {
        result = 'Người dùng đã tham gia sự kiện';
      } else {
        await this.userRepository.query(
          `insert into Events_Users (UserID, EventID) values (${userId},  ${eventId})`,
        );
        result = 'Tham gia vào sự kiện thành công';
      }
    } else {
      result = 'Kiểm tra lại giá trị đưa vào...';
    }
    return result;
  }

  // relation
  async followEvents(UserID: number): Promise<Event[]> {
    return this.userRepository.query(
      `select Events.* from Events 
        inner join Events_Followers 
        on Events.EventID = Events_Followers.EventID 
        where Events_Followers.UserID = ${UserID}
  `,
    );
  }

  async fcmTokens(UserID: number): Promise<FCMToken[]> {
    return this.userRepository.query(`
      select * from FCMTokens where userId = ${UserID}
      `);
  }

  async followings(UserID: number): Promise<User[]> {
    const data = await this.userRepository.query(`
      select * from Follows where followingId = ${UserID}
      `);

    let result: any;
    if (data) {
      const resultLoader = data.map((follow: any) =>
        this.dataloaderService.loaderUser.load(follow.followerId),
      );
      result = await Promise.all(resultLoader);
    }
    return result;
  }

  async followers(UserID: number): Promise<User[]> {
    const data = await this.userRepository.query(`
      select * from Follows where followerId = ${UserID} 
      `);
    let result: any;
    if (data) {
      const resultLoader = data.map((follow: any) =>
        this.dataloaderService.loaderUser.load(follow.followingId),
      );
      result = await Promise.all(resultLoader);
    }
    return result;
  }

  async interests(UserID: number): Promise<User[]> {
    return this.userRepository.query(
      `select Categories.* from Categories 
        inner join Categories_Users 
        on Categories.CategoryID = Categories_Users.CategoryID 
        where Categories_Users.UserID = ${UserID}
  `,
    );
  }

  async bills(UserID: number): Promise<Bill[]> {
    return this.userRepository.query(
      `select * from Bills where userBuyId = ${UserID}`,
    );
  }

  async author_events(UserID: number): Promise<Event[]> {
    return this.userRepository.query(
      `select * from Events where authorId = ${UserID}`,
    );
  }

  async reReviewers(UserID: number): Promise<Review[]> {
    return this.userRepository.query(
      `select * from Reviews where reReviewerId = ${UserID}`,
    );
  }
}
