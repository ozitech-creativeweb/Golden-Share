export class UserVerification {
    id: number;
    login_id: number;
    email_code: string;
    email_verify: number;
    sms_code: string;
    sms_verify: number;
    created_at: Date;
    updated_at: Date;
}
