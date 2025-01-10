import { AuthResponse, UserDto } from './dto/user.dto';
import { UserRepository } from './users.repository';
import { BaseService } from '../base/base.service';
import { User } from './entities/users.entity';
import { TransactionScope } from '../base/transactionScope';
import { BcryptService } from '../services/bcrypt';
import { AuthService } from './auth/auth.service';
import { ApiResponse } from '../helpers/handleResponse';
export declare class UsersService extends BaseService {
    private usersRepository;
    private bcryptService;
    private authService;
    constructor(usersRepository: UserRepository, bcryptService: BcryptService, authService: AuthService);
    commitTransaction(ts: TransactionScope): Promise<void>;
    create(createUserDto: UserDto): Promise<ApiResponse<AuthResponse>>;
    login(user: User): Promise<ApiResponse<AuthResponse>>;
}
