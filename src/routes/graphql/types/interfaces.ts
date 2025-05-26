import {PrismaClient} from "@prisma/client";

export interface Member {
    id: string;
    discount: number;
    postsLimitPerMonth: number;
}

export interface User {
    id: string;
    name: string;
    balance: number;
}

export interface Post {
    id: string;
    title: string;
    content: string;
}

export interface Profile {
    id: string;
    isMale: boolean;
    yearOfBirth: number;
    memberType: Member;
}

export type RootQueryType = Member | User | Post | Profile;

export type Context = { prisma: PrismaClient };

export type ID = {
    id: string,
};