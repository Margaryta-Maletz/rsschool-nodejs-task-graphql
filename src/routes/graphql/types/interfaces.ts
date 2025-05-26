import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

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
    userId: string,
    memberTypeId: string,
}

export type RootQueryType = Member | User | Post | Profile;
export type DataLoaders = WeakMap<WeakKey, DataLoader<unknown, unknown>>;

export type Context = { prisma: PrismaClient; dataLoaders: DataLoaders; };

export type ID = {
    id: string,
};
