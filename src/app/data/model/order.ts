export class Order {
    constructor (
        public order_id: number,
        public invoice_id: number,
        public login_id: number,
        public seller_id: number,
        public pid: number,
        public order_number: string,
        public role: string,
        public amount: number,
        public processing_fee: number,
        public total: number,
        public payment_method: string,
        public status: string,
        public payment_status: number,
        public created_at: Date,
        public updated_at: Date,
    ) {}
}
