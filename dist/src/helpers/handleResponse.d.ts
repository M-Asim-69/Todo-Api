import { CommonDtos } from 'src/common/dto';
export interface ApiResponse<T> {
    status: number;
    result: boolean;
    message: string;
    data: T;
    token?: string;
}
export declare const handleData: <T>(data: T, message?: string, status?: number) => ApiResponse<T>;
export declare const paginatedResponse: <T>(totalRecords: number, query: CommonDtos.PaginationInput, data: T[]) => {
    totalRecords: number;
    page: number;
    limit: number;
    totalPages: number;
    currentRecords: number;
};
