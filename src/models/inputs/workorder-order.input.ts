import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum WorkorderOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(WorkorderOrderField, {
  name: 'WorkorderOrderField',
  description: 'Properties by which workorder connections can be ordered.',
});

@InputType()
export class WorkorderOrder extends Order {
  field: WorkorderOrderField;
}
