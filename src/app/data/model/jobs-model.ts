export class JobsModel {
    constructor(
        public id: number,
        public login_id: number,
        public viewers: number,
        public title: string,
        public category: string,
        public required_skills: string,
        public description: string,
        public attachment: string,
        public budget: number,
        public req_duration: number,
        public status: number,
        public status_note: string,
        public actions: string,
        public last_modified: Date,
        public created_at: Date,
        public updated_at: Date
    ) { }
}
