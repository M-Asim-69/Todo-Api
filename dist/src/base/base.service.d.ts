import { TransactionScope } from './transactionScope';
export declare abstract class BaseService {
    protected getTransactionScope(): TransactionScope;
}
