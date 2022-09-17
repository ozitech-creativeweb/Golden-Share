export class UserEducation {
    constructor(
        public edu_id: number,
        public login_id: number,
        public school: string,
        public degree: string,
        public attended_from: string,
        public degree_date: Date,
        public about_degree: string,
        public created_at: Date,
        public updated_at: Date,
    ) {}
}
