import {GraphQLObjectType, GraphQLString} from 'graphql';
import { GraphQLNonNull } from 'graphql';
import { Context, ID, Post, Profile, RootQueryType, User } from './types/interfaces.js';
import { PostType, ProfileType, UserType } from './types/objects.js';
import { CreatePostInputType, CreateProfileInputType, CreateUserInputType } from './types/inputs.js';
import { UUIDType } from './types/uuid.js';


export const mutationType = new GraphQLObjectType<RootQueryType, Context>({
    name: 'Mutation',
    description: 'MutationType',
    fields: {
        createUser: {
            type: new GraphQLNonNull(UserType),
            args: {
                dto: { type: new GraphQLNonNull(CreateUserInputType) }
            },
            resolve: async (source, { dto }: { dto: Omit<User, 'id'> }, context) => {
                return context.prisma.user.create({
                    data: dto
                });
            }
        },
        createProfile: {
            type: new GraphQLNonNull(ProfileType),
            args: {
                dto: { type: new GraphQLNonNull(CreateProfileInputType) }
            },
            resolve: async (source, { dto }: { dto: Omit<Profile, 'id'> }, context) => {
                return context.prisma.profile.create({
                    data: dto
                });
            }
        },
        createPost: {
            type: new GraphQLNonNull(PostType),
            args: {
                dto: { type: new GraphQLNonNull(CreatePostInputType) }
            },
            resolve: async (source, { dto }: { dto: Omit<Post, 'id'> }, context) => {
                return context.prisma.post.create({
                    data: dto
                });
            }
        },
        deleteUser: {
            type: GraphQLString,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) }
            },
            resolve: async (source, { id }: ID, context) => {
                await context.prisma.user.delete({
                    where: { id: id },
                });
                return 'User was deleted';
            }
        },
        deleteProfile: {
            type: GraphQLString,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) }
            },
            resolve: async (source, { id }: ID, context) => {
                await context.prisma.profile.delete({
                    where: { id },
                });
                return 'Profile was deleted';
            }
        },
        deletePost: {
            type: GraphQLString,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) }
            },
            resolve: async (source, { id }: ID, context) => {
                await context.prisma.post.delete({
                    where: { id },
                });
                return 'Post was deleted';
            }
        },
    },
});
