
enum Confidence {
    None = 0,
    Low = 1,
    Medium = 2,
    High = 3
}

interface Course {
    name: string;
    knowledge_level: Confidence;
}

export interface User {
    email: string;
    first_name?: string;
    last_name?: string;
    school?: string;
    courses?: Course[];
    isActive: boolean;
}
