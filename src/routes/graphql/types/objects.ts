import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLInt,
    GraphQLBoolean
} from 'graphql';
import { UUIDType } from './uuid.js';
import { Context, Member, Post, Profile, User } from "./interfaces.js";

export const MemberTypeId = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        BASIC: { value: 'BASIC' },
        BUSINESS: { value: 'BUSINESS' }
    }
});

export const MemberType = new GraphQLObjectType<{ id: string } & Member>({
    name: 'MemberType',
    fields: () => ({
        id: { type: new GraphQLNonNull(MemberTypeId) },
        discount: { type: new GraphQLNonNull(GraphQLFloat) },
        postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
    })
});

export const UserType = new GraphQLObjectType<{ id: string } & User, Context>({
    name: 'User',
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
        profile: { type: ProfileType },
        posts: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))) },
    })
});

export const PostType = new GraphQLObjectType<{ id: string } & Post>({
    name: 'Post',
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
    })
});

export const ProfileType = new GraphQLObjectType<{ id: string } & Profile, Context>({
    name: 'Profile',
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        memberType: {type: MemberType}
    })
});
