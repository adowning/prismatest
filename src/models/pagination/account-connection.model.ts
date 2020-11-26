import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { Account } from '../account.model';

@ObjectType()
export class AccountConnection extends PaginatedResponse(Account) {}
