import {GraphQLList, GraphQLObjectType} from "graphql/type/index.js";
import {MemberType, PostType, ProfileType, UserType} from './types/objects.js';
import {Context} from './index.js';
import {RootQueryType} from './types/interfaces.js';

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
    },
});
