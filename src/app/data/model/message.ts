export class Message {
    constructor (
        id: number,
        sender_id: number,
        receiver_id: number,
        msg_number: number,
        message: string,
        attachment: any,
        status: number,
        created_at: Date,
        updated_at: Date,
        seen_at: Date,
    ) {}
}
