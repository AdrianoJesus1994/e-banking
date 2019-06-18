// tslint:disable:no-string-literal

export default class User {
    name: string;
    account: string;
    agency: string;
    holder: number;
    phone: string;
    uid: string;
    paymentMaxValue: string;
    infoEmail: string;
    setPassword: boolean;

    constructor(data) {
        this.name = data.name;
        this.account = data.account;
        this.agency = data.agency;
        this.holder = data.holder;
        this.phone = data.phone;
        this.uid = data.uid;
        this.paymentMaxValue = data['payment_max_value'];
        this.infoEmail = data['info_email'];
        this.setPassword = data['set_password'];
    }
}
