import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { BaseModel } from './base.model';

@ObjectType()
export class Account extends BaseModel {
  acquisitionDate?: Date;
  accountName?: string;
  alert?: boolean;
  address2?: string;
  commercial?: boolean;
  city?: string;
  accountID?: string;
  companyID?: string;
  companyName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  state?: string;
  taxExempt?: boolean;
  taxID?: string;
  zip?: string;
  phone1?: string;
  lastInvoiceDate?: Date;
  averageInvoice?: number;
  invoiceCount?: number;
  lastEstimateCreatedDate?: string;
  lastInvoiceAmount?: number;
  searchAddress?: string;
  lastJobAmount?: number;
  lat?: number;
  lng?: number;
  placeid?: string;
  formatted_address?: string;
  phone2?: string;
  phone3?: string;
}
