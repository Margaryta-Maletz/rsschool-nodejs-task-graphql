import { GraphQLObjectType } from 'graphql/type/index.js';
import { Context, Post, Profile, RootQueryType, User } from './types/interfaces.js';
import { PostType, ProfileType, UserType } from './types/objects.js';
import { GraphQLNonNull } from 'graphql';
import { CreatePostInputType, CreateProfileInputType, CreateUserInputType } from './types/inputs.js';


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
    },
});
