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
import {
    membersLoader,
    postsLoader,
    profilesLoader,
    subscribedToUserLoader,
    userSubscribedToLoader
} from '../loaders.js';

export const MemberTypeId = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        BASIC: { value: 'BASIC' },
        BUSINESS: { value: 'BUSINESS' }
    }
});

export const MemberType = new GraphQLObjectType<Member>({
    name: 'MemberType',
    fields: () => ({
        id: { type: new GraphQLNonNull(MemberTypeId) },
        discount: { type: new GraphQLNonNull(GraphQLFloat) },
        postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
    })
});

export const UserType = new GraphQLObjectType<User, Context>({
    name: 'User',
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
        profile: {
            type: ProfileType,
            resolve: async ({ id }, args, context, info) => {
                const dataLoader = profilesLoader(info, context);
                return dataLoader.load(id);
            },
        },

        posts: {
            type: new GraphQLList(PostType),
            resolve: async ({ id }, _args, context, info) => {
                const dataLoader = postsLoader(info, context);
                return dataLoader.load(id);
            },
        },

        userSubscribedTo: {
            type: new GraphQLList(UserType),
            resolve: async ({ id }, _args, context, info) => {
                const dataLoader = userSubscribedToLoader(info, context);
                return dataLoader.load(id);
            },
        },

        subscribedToUser: {
            type: new GraphQLList(UserType),
            resolve: async ({ id }, _args, context, info) => {
                const dataLoader = subscribedToUserLoader(info, context);
                return dataLoader.load(id);
            },
        },
    })
});

export const PostType = new GraphQLObjectType<Post>({
    name: 'Post',
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
    })
});

export const ProfileType = new GraphQLObjectType<Profile, Context>({
    name: 'Profile',
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        userId: { type: UUIDType },
        memberTypeId: { type: MemberTypeId },

        memberType: {
            type: MemberType,
            resolve: ({ memberTypeId }, _args, context, info) => {
                const dataLoader = membersLoader(info, context);
                return dataLoader.load(memberTypeId);
            },
        },
    })
});
