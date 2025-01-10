import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: UserDto): Promise<import("../helpers/handleResponse").ApiResponse<import("./dto/user.dto").AuthResponse>>;
    login(req: any): Promise<import("../helpers/handleResponse").ApiResponse<import("./dto/user.dto").AuthResponse>>;
}
