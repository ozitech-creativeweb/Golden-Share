export class UserLanguage {
    constructor(
        public id: number,
        public login_id: number,
        public language: string,
        public level: string,
        public created_at: Date,
        public updated_at: Date,
    ) { }
}
