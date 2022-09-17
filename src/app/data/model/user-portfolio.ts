export class UserPortfolio {
    constructor(
        public prt_id: number,
        public login_id: number,
        public prt_name: string,
        public prt_desc: string,
        public img_url: string,
        public project_url: string,
        public created_at: Date,
        public updated_at: Date,
    ) {}
}
