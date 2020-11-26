import { PrismaService } from './../../services/prisma.service';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { WorkorderIdArgs } from '../../models/args/workorder-id.args';
import { UserIdArgs } from '../../models/args/user-id.args';
import { Resolver, Query, Parent, Args, ResolveField } from '@nestjs/graphql';
import { Workorder } from '../../models/workorder.model';
import { WorkorderOrder } from '../../models/inputs/workorder-order.input';
import { WorkorderConnection } from 'src/models/pagination/workorder-connection.model';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { OrderType } from '@prisma/client';

@Resolver((of) => Workorder)
export class WorkorderResolver {
  constructor(private prisma: PrismaService) {}

  @Query((returns) => WorkorderConnection)
  async publishedWorkorders(
    @Args() { skip, after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => WorkorderOrder,
      nullable: true,
    })
    orderBy: WorkorderOrder
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.workorder.findMany({
          // include: { author: true },
          // where: {
          // published: true,
          // title: { contains: query || '' },
          // },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () =>
        this.prisma.workorder.count({
          // where: {
          // published: true,
          // title: { contains: query || '' },
          // },
        }),
      { first, last, before, after }
    );
    return a;
  }

  // @Query((returns) => [Workorder])
  // userWorkorders(@Args() id: UserIdArgs) {
  //   return this.prisma.user
  //     .findOne({ where: { id: id.userId } })
  //     .workorders({ where: { published: true } });

  //   // or
  //   // return this.prisma.workorders.findMany({
  //   //   where: {
  //   //     published: true,
  //   //     author: { id: id.userId }
  //   //   }
  //   // });
  // }
  @Query((returns) => [Workorder])
  activeWorkorders() {
    return this.prisma.workorder.findMany({
      where: { orderType: OrderType.WORKORER },
    });

    // or
    // return this.prisma.workorders.findMany({
    //   where: {
    //     published: true,
    //     author: { id: id.userId }
    //   }
    // });
  }
  @Query((returns) => Workorder)
  async workorder(@Args() id: WorkorderIdArgs) {
    return this.prisma.workorder.findOne({ where: { id: id.orderID } });
  }

  // @ResolveField('author')
  // async author(@Parent() workorder: Workorder) {
  //   return this.prisma.workorder.findOne({ where: { id: workorder.id } }).author();
  // }

  @Query((returns) => WorkorderConnection)
  async publishedPosts(
    @Args() { skip, after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => WorkorderOrder,
      nullable: true,
    })
    orderBy: WorkorderOrder
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.workorder.findMany({
          // include: { author: true },
          where: {
            orderType: { equals: OrderType.WORKORER },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () =>
        this.prisma.workorder.count({
          where: {
            orderType: { equals: OrderType.WORKORER },
          },
        }),
      { first, last, before, after }
    );
    return a;
  }
}
