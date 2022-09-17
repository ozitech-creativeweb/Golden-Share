export class Offer {
    public pid: number;
    public username: string;
    public photo: string;
    public state: string;
    public country: string;
    public country_iso: string;
    public lastseen_at: Date;
    constructor(
        public id: number,
        public request_id: number,
        public offer_from: number,
        public offer_to: number,
        public title: string,
        public amount: number,
        public duration: string,
        public content: string,
        public attachments: string,
        public status: string,
        public created_at: Date,
        public updated_at: Date
    ) { }
}
