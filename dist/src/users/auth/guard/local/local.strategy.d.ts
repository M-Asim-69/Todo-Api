import { UserRepository } from '../../../users.repository';
import { AuthService } from '../../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    private userRepository;
    constructor(authService: AuthService, userRepository: UserRepository);
    validate(username: string, password: string): Promise<any | Error>;
}
export {};
