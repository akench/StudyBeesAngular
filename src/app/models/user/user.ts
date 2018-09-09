
interface Course {
    name: string;
}

export interface User {
    email: string;
    first_name?: string;
    last_name?: string;
    school?: string;
    courses?: string[];
    isActive: boolean;
}
