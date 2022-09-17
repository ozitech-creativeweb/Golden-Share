export class UserEmployment {
    constructor(
        public exp_id: number,
        public login_id: number,
        public position: string,
        public company: string,
        public start_date: string,
        public start_year: string,
        public end_date: string,
        public end_year: string,
        public currently_work_here: string,
        public about: string,
        public created_at: Date,
        public updated_at: Date,
    ) {}
}
