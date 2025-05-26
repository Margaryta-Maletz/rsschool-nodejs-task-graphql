import {GraphQLObjectType, GraphQLString} from 'graphql';
import { GraphQLNonNull } from 'graphql';
import { Context, ID, Post, Profile, RootQueryType, User } from './types/interfaces.js';
import { PostType, ProfileType, UserType } from './types/objects.js';
import {
    ChangePostInputType,
    ChangeProfileInputType,
    ChangeUserInputType,
    CreatePostInputType,
    CreateProfileInputType,
    CreateUserInputType
} from './types/inputs.js';
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
                    where: { id },
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
        changeUser: {
            type: new GraphQLNonNull(UserType),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(ChangeUserInputType) }
            },
            resolve: async (source, { dto, id }: { dto: Omit<User, 'id'> } & ID, context) => {
                return context.prisma.user.update({
                    where: { id },
                    data: dto
                });
            }
        },
        changeProfile: {
            type: new GraphQLNonNull(ProfileType),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(ChangeProfileInputType) }
            },
            resolve: async (source, { dto, id }: { dto: Omit<Profile, 'id'> } & ID, context) => {
                return context.prisma.profile.update({
                    where: { id },
                    data: dto
                });
            }
        },
        changePost: {
            type: new GraphQLNonNull(PostType),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(ChangePostInputType) }
            },
            resolve: async (source, { dto, id }: { dto: Omit<Post, 'id'> } & ID, context) => {
                return context.prisma.post.update({
                    where: { id },
                    data: dto
                });
            }
        },
        subscribeTo: {
            type: GraphQLString,
            args: {
                userId: { type: new GraphQLNonNull(UUIDType) },
                authorId: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (source, { userId, authorId }: { userId: string, authorId: string, }, context) => {
                const response = await context.prisma.user.update({
                    where: { id: userId },
                    data: {
                        userSubscribedTo: {
                            create: {
                                authorId
                            }
                        }
                    }
                });
                return response.id;
            }
        },
        unsubscribeFrom: {
            type: GraphQLString,
            args: {
                userId: { type: new GraphQLNonNull(UUIDType) },
                authorId: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (source, { userId, authorId }: { userId: string, authorId: string, }, context) => {
                const response = await context.prisma.subscribersOnAuthors.delete({
                    where: {
                        subscriberId_authorId: {
                            subscriberId: userId,
                            authorId
                        }
                    },
                });
                return response.authorId;
            }
        },
    },
});
