export declare class BcryptService {
    hashPassword(password: string): Promise<any>;
    compareHashPassword(password: string, hashedPassword: string): Promise<any>;
}
