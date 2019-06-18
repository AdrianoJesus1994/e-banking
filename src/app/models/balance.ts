// tslint:disable:no-string-literal
export default class Balance {
    balance: number;
    limit: number;
    availableLimit: number;
    blockedAmount: number;

    constructor(data) {
        this.balance = data.balance;
        this.limit = data.limit;
        this.availableLimit = data['available_limit'];
        this.blockedAmount = data['blocked_amount'];
    }
}
