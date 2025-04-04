export type User = {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    role: 'Admin' | 'User';
    position: string;
    active: boolean;
}