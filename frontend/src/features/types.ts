/* authSlice.ts */
export interface LOGIN_USER {
    id: number;
    username: string;
}

export interface PROFILE {
    id: number;
    user_profile: number;
}

export interface CRED {
    username: string;
    password: string;
}

export interface JWT {
    refresh: string;
    access: string;
}

export interface USER {
    id: number;
    username: string;
}

export interface AUTH_STATE {
    isLoginView: boolean;
    loginUser: LOGIN_USER;
    profiles: PROFILE[];
}