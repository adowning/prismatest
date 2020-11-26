import { PrismaService } from '../../services/prisma.service';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { AccountIdArgs } from '../../models/args/account-id.args';
import { UserIdArgs } from '../../models/args/user-id.args';
import { Resolver, Query, Parent, Args, ResolveField } from '@nestjs/graphql';
import { Account } from '../../models/account.model';
import { AccountOrder } from '../../models/inputs/account-order.input';
import { AccountConnection } from 'src/models/pagination/account-connection.model';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { OrderType } from '@prisma/client';

@Resolver((of) => Account)
export class AccountResolver {
  constructor(private prisma: PrismaService) {}

  @Query((returns) => AccountConnection)
  async publishedAccounts(
    @Args() { skip, after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => AccountOrder,
      nullable: true,
    })
    orderBy: AccountOrder
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.account.findMany({
          // include: { author: true },
          // where: {
          // published: true,
          // title: { contains: query || '' },
          // },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () =>
        this.prisma.account.count({
          // where: {
          // published: true,
          // title: { contains: query || '' },
          // },
        }),
      { first, last, before, after }
    );
    return a;
  }

  // @Query((returns) => [Account])
  // userAccounts(@Args() id: UserIdArgs) {
  //   return this.prisma.user
  //     .findOne({ where: { id: id.userId } })
  //     .accounts({ where: { published: true } });

  //   // or
  //   // return this.prisma.accounts.findMany({
  //   //   where: {
  //   //     published: true,
  //   //     author: { id: id.userId }
  //   //   }
  //   // });
  // }
  // @Query((returns) => [Account])
  // activeAccounts() {
  //   return this.prisma.account.findMany({
  //     where: { orderType: OrderType.WORKORER },
  //   });
  // }

  @Query((returns) => Account)
  async account(@Args() id: AccountIdArgs) {
    return this.prisma.account.findOne({ where: { id: id.accountId } });
  }

  // @ResolveField('author')
  // async author(@Parent() account: Account) {
  //   return this.prisma.account.findOne({ where: { id: account.id } }).author();
  // }
}
