import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { Workorder } from '../workorder.model';

@ObjectType()
export class WorkorderConnection extends PaginatedResponse(Workorder) {}
