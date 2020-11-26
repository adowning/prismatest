import { OrderType, PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { Workorder } from 'src/models/workorder.model';
// import * as data from '/home/ash/orders_fixed.json';
import * as data from '/home/ash/customers.1.json';
import * as data1 from '/home/ash/customers.2.json';
import * as data2 from '/home/ash/customers.3.json';
const d0: any = (data as any).default;

const d1: any = (data1 as any).default;
const d2: any = (data2 as any).default;

const accounts = d0.concat(...d1, ...d2);
console.log(accounts.length);
// const orders: any = (data as any).default;

// @ts-ignore
const prisma = new PrismaClient();

function renameKey(obj, old_key, new_key) {
  // check if old key = new key
  if (old_key !== new_key) {
    Object.defineProperty(
      obj,
      new_key, // modify old key
      // fetch description from object
      Object.getOwnPropertyDescriptor(obj, old_key)
    );
    delete obj[old_key]; // delete old key
  }
}
// function round(value, decimals) {
//   return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
// }

for (var account of accounts) {
  try {
    account.lat = account.geoAddress.geometry.location.lat;
    account.lng = account.geoAddress.geometry.location.lng;
    delete account.geoAddress;
  } catch (e) {
    account.lat = 0.0;
    account.lng = 0.0;
    delete account.geoAddress;
  }
  if (account._updated_at != undefined) {
    account.updatedAt = new Date(account._updated_at['$date']);
  }
  delete account._updated_at;
  if (account._created_at != undefined) {
    account.createdAt = new Date(account._created_at['$date']);
  }
  delete account._created_at;
  account.lastInvoiceDate = new Date(account.lastInvoiceDate);
  account.lastJobDate = new Date(account.lastJobDate);
  // delete account.lastJobDate;
  account.acquisitionDate = new Date(account.acquisitionDate);
  account.acquisitionDate = new Date(account.acquisitionDate);
  if (typeof account.updatedAt == 'number') {
    account.updatedAt = new Date(account.updatedAt);
  }
  if (typeof account.createdAt == 'number') {
    account.createdAt = new Date(account.updatedAt);
  }

  for (const [key, value] of Object.entries(account)) {
    if (value == null || value == undefined || value == NaN) {
      delete account[key];
    }
    if (value != undefined && value != NaN && value != 'unknown') {
      if (typeof value == 'number' && key != 'lat' && key != 'lng') {
        account[key] = parseInt(value.toFixed(2));
      }
      if (key == 'lat' || key == 'lng') {
        if (typeof value == 'number') {
          account[key] = parseInt(value!.toFixed(9));
        }
      }
    }
  }
}
//   order.imported = true;
//   delete order.corporatePayableTotal;
//   delete order.corporateFeesTotal;
//   delete order.postedtocorporate;
//   order.updatedAt = new Date(order.timeStamp);
//   order.dateCreated = new Date(order.dateCreated);
//   order.refNumber = order.RefNumber;
//   delete order.RefNumber;
//   delete order.timeStamp;
//   delete order.externalRefID;
//   order.taxRate = parseInt(order.taxRate);
//   delete order.printStyleID;`
//   if (order.orderType == 'Estimate') {
//     order.orderType = OrderType.ESTIMATE;
//   }
//   if (order.orderType == 'Invoice') {
//     order.orderType = OrderType.INVOICE;
//   }
//   if (order.orderType == 'Workorder' || order.orderType == 'Work Order') {
//     order.orderType = OrderType.WORKORER;
//   }
//   if (order.orderType == 'voided' || order.orderType == 'Voided') {
//     order.orderType = OrderType.VOIDED;
//   }
//   if (order.originalType == 'Estimate') {
//     order.originalType = OrderType.ESTIMATE;
//   }
//   if (order.originalType == 'Invoice') {
//     order.originalType = OrderType.INVOICE;
//   }
//   if (order.originalType == 'Workorder' || order.originalType == 'Work Order') {
//     order.originalType = OrderType.WORKORER;
//   }
//   if (order.originalType == 'voided' || order.originalType == 'Voided') {
//     order.originalType = OrderType.VOIDED;
//   }
//   delete order.group;
//   delete order.flagForReview;

//   order.grandTotal = parseInt(order.grandTotal);
//   order.subTotal = parseInt(order.subTotal);
//   order.balanceDue = parseInt(order.balanceDue);
//   order.taxTotal = parseInt(order.taxTotal);
//   order.dueDate = Date.parse(order.dueDate);
//   order.datePosted = Date.parse(order.datePosted);
//   order.dateCompleted = Date.parse(order.dateCompleted);
//   delete order.dateCompleted;
//   delete order.datePosted;
//   delete order.dueDate;
//   delete order.note;
//   delete order.address2;
//   delete order.tipCollected;
//   delete order.printJobStartDateTime;
//   delete order.createdOn;
//   delete order.discountPercent;
//   delete order.dateOfLoss;
//   delete order.subGroup;
//   delete order.actionItem;
//   delete order.nextJobDate;

//   if (order.zip == null) {
//     order.zip = 1;
//   }
//   if (order.zip == undefined) {
//     order.zip = 1;
//   }
//   order.zip = parseInt(order.zip);

//   if (order.zip < 1) {
//     delete order.zip;
//   }
//   if (typeof order.zip != 'number') {
//     console.log(typeof order.zip);
//     delete order.zip;
//   }

//   order.comments = [];
// }

async function main() {
  dotenv.config();
  console.log('Seeding...');
  var x = 0;
  // for (var order of orders) {
  //   if (typeof order.zip != 'number') {
  //     console.log(typeof order.zip);
  //     order.zip = parseInt(order.zip);
  //   }
  //   try {
  //     const neworder = await prisma.workorder.create({ data: order });
  //   } catch (e) {
  //     console.log(x);
  //     x++;
  //   }
  // }
  for (var acc of accounts) {
    // try {
    const _account = await prisma.account.create({ data: acc });
    // } catch (e) {
    //   console.log(e);
    //   x++;
    // }
  }
  // const user1 = await prisma.user.create({
  //   data: {
  //     email: 'lisa@simpson.com',
  //     firstname: 'Lisa',
  //     lastname: 'Simpson',
  //     password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
  //     role: 'USER',
  //     posts: {
  //       create: {
  //         title: 'Join us for Prisma Day 2019 in Berlin',
  //         content: 'https://www.prisma.io/day/',
  //         published: true,
  //       },
  //     },
  //   },
  // });
  // const user2 = await prisma.user.create({
  //   data: {
  //     email: 'bart@simpson.com',
  //     firstname: 'Bart',
  //     lastname: 'Simpson',
  //     role: 'ADMIN',
  //     password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
  //     posts: {
  //       create: [
  //         {
  //           title: 'Subscribe to GraphQL Weekly for community news',
  //           content: 'https://graphqlweekly.com/',
  //           published: true,
  //         },
  //         {
  //           title: 'Follow Prisma on Twitter',
  //           content: 'https://twitter.com/prisma',
  //           published: false,
  //         },
  //       ],
  //     },
  //   },
  // });

  // console.log({ user1, user2 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
