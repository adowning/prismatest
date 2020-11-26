import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum AccountOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  published = 'published',
  title = 'title',
  content = 'content',
}

registerEnumType(AccountOrderField, {
  name: 'AccountOrderField',
  description: 'Properties by which account connections can be ordered.',
});

@InputType()
export class AccountOrder extends Order {
  field: AccountOrderField;
}
