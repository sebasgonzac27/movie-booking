export interface AuthResponse {
    token: string;
    email: string;
}

export interface AuthDto {
    email: string;
    password: string;
}