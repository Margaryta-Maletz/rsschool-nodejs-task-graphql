import { GraphQLList, GraphQLObjectType } from "graphql/type/index.js";
import { MemberType, MemberTypeId, PostType, ProfileType, UserType } from './types/objects.js';
import { Context, ID, RootQueryType } from './types/interfaces.js';
import { GraphQLNonNull } from 'graphql';
import { UUIDType } from './types/uuid.js';

export const rootQueryType = new GraphQLObjectType<RootQueryType, Context>({
    name: 'Query',
    description: 'RootQueryType',
    fields: {
        memberTypes: {
            type: new GraphQLList(MemberType),
            resolve: async (source, args, context) => {
                    return context.prisma.memberType.findMany();
                }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: async (source, args, context) => {
                return context.prisma.user.findMany();
            },
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve: async (source, args, context) => {
                return context.prisma.post.findMany();
            },
        },
        profiles: {
            type: new GraphQLList(ProfileType),
            resolve: async (source, args, context) => {
                return context.prisma.profile.findMany();
            },
        },
        memberType: {
            type: MemberType,
            args: {
                id: { type: new GraphQLNonNull(MemberTypeId) }
            },
            resolve: async (source, { id }: ID, context) => {
                return context.prisma.memberType.findUnique({
                    where: { id }
                });
            }
        },
        user: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) }
            },
            resolve: async (source, { id }: ID, context) => {
                return context.prisma.user.findUnique({
                    where: { id }
                });
            },
        },
        post: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) }
            },
            resolve: async (source, { id }: ID, context) => {
                return context.prisma.post.findUnique({
                    where: { id }
                });
            },
        },
        profile: {
            type: ProfileType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) }
            },
            resolve: async (source, { id }: ID, context) => {
                return context.prisma.profile.findUnique({
                    where: { id }
                });
            },
        },
    },
});
