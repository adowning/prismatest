import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { User } from './user.model';

@ObjectType()
export class Comment extends BaseModel {
  body: string;
  author: User;
  reference: string;
  orderID: string;
  workorder: Workorder;
}

@ObjectType()
export class Workorder extends BaseModel {
  imported: boolean;
  accountID: string;
  orderID: string;
  accountName: string;
  address1?: string;
  city?: string;
  state?: string;
  zip?: number;
  companyID: string;
  correction: number;
  createdBy: string;
  createdOn: Date;
  dateCreated: Date;
  discountPercent: number;
  balanceDue: number;
  grandTotal: number;
  orderNumber: number;
  orderType: string;
  originalType: string;
  postToAccounting: boolean;
  salesRepID?: string;
  siteID: string;
  subTotal: number;
  taxID: string;
  taxRate: number;
  userName: string;
  merchantFeesTotal?: number;

  callList?: string[];
  comments?: Comment[];
}
