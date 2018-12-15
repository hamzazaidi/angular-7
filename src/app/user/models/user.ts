export interface IUser {
    id?: number;
    name?: string;
    first_name: string;
    last_name: string;
    avatar: string;
    job?: string;
    isProcessing: boolean;
    createdAt?: string;
}
