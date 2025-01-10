import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users.repository';
import { BcryptService } from 'src/services/bcrypt';
import { User } from '../entities/users.entity';
export declare class AuthService {
    private jwtService;
    private userRepository;
    private bcryptService;
    constructor(jwtService: JwtService, userRepository: UserRepository, bcryptService: BcryptService);
    validateUser(username: string, pass: string): Promise<any>;
    getToken(user: User): Promise<{
        access_token: string;
    }>;
}
