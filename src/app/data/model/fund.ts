export class Fund {
    constructor (
        public upcoming: number,
        public allEarnings: number,
        public withdrawn: number,
        public balance: number,
        public clearing: number,
        public revenueBalance: number,
    ) {}
}
