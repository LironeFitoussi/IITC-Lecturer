export interface User {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "customer";
    phone: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v: number;
}