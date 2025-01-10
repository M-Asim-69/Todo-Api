import { User } from '../entities/users.entity';
export declare class LoginDto {
    username: string;
    password: string;
}
export declare class UserDto extends LoginDto {
    email: string;
}
export interface AuthResponse {
    user: User;
    access_token: string;
}
