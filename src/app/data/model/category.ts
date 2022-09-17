export class Category {
    constructor(
        public cat_id: number,
        public role: string,
        public level: number,
        public icon: string,
        public cat_name: string,
        public notation: string,
        public cat_slug: string,
        public cat_desc: string,
        public created_at: Date,
        public updated_at: Date,
    ) { }

}

export class SubCategory {
    constructor(
        public subcat_id: number,
        public level: string,
        public cat_id: number,
        public cat_name: string,
        public subcat_name: string,
        public subcat_slug: string,
        public description: string,
        public seo_title: string,
        public seo_descr: Date,
        public created_at: Date,
        public updated_at: Date,
    ) { }
}
