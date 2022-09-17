export class Checkout {
    constructor (
        public processingFee: number,
        public totalAmt: number,
        public dueAmount: number,
        public balance: number,
        public amount: number,
        public itemORserviceID: number,
        public orderType: string,
        public payStackKey: string,
        public payStackBearer: string,
        public prePaymentRef: string,
    ) {}
}
