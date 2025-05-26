export interface MemberType {
    id: string;
    discount: number;
    postsLimitPerMonth: number;
}

export interface UserType {
    id: string;
    name: string;
    balance: number;
}

export interface PostType {
    id: string;
    title: string;
    content: string;
}

export interface ProfileType {
    id: string;
    isMale: boolean;
    yearOfBirth: number;
    memberType: MemberType;
}

export type RootQueryType = MemberType | UserType | PostType | ProfileType;