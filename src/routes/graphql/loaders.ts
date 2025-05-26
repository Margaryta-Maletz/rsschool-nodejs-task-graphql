import {Context} from './types/interfaces.js';
import {GraphQLResolveInfo} from 'graphql';
import DataLoader from 'dataloader';

export const membersLoader = (
    info: GraphQLResolveInfo,
    { prisma, dataLoaders }: Context,
) => {
    let dataLoader = dataLoaders.get(info.fieldNodes);
    if (!dataLoader) {
        dataLoader = new DataLoader(async (ids: readonly string[]) => {
            const foundElements = await prisma.memberType.findMany();
            return ids.map((id) => foundElements.find((member) => member.id === id));
        });
        dataLoaders.set(info.fieldNodes, dataLoader);
    }
    return dataLoader;
};

export const postsLoader = (
    info: GraphQLResolveInfo,
    { prisma, dataLoaders }: Context,
) => {
    let dataLoader = dataLoaders.get(info.fieldNodes);
    if (!dataLoader) {
        dataLoader = new DataLoader(async (ids: readonly string[]) => {
            const foundElements = await prisma.post.findMany({
                where: {
                    authorId: { in: [...ids] },
                },
            });
            return ids.map((id) => foundElements.filter((post) => post.authorId === id));
        });
        dataLoaders.set(info.fieldNodes, dataLoader);
    }
    return dataLoader;
};

export const profilesLoader = (
    info: GraphQLResolveInfo,
    { prisma, dataLoaders }: Context,
) => {
    let dataLoader = dataLoaders.get(info.fieldNodes);
    if (!dataLoader) {
        dataLoader = new DataLoader(async (ids: readonly string[]) => {
            const foundElements = await prisma.profile.findMany({
                where: {
                    userId: { in: [...ids] },
                },
            });
            return ids.map((id) => foundElements.find((profile) => profile.userId === id));
        });
        dataLoaders.set(info.fieldNodes, dataLoader);
    }
    return dataLoader;
};

export const subscribedToUserLoader = (
    info: GraphQLResolveInfo,
    { dataLoaders, prisma }: Context,
) => {
    let dataLoader = dataLoaders.get(info.fieldNodes);
    if (!dataLoader) {
        dataLoader = new DataLoader(async (ids: readonly string[]) => {
            const foundElements = await prisma.user.findMany({
                where: {
                    userSubscribedTo: {
                        some: {
                            authorId: { in: [...ids] },
                        },
                    },
                },
                include: {
                    userSubscribedTo: true,
                },
            });
            return ids.map((id) => foundElements.filter((user) => user.userSubscribedTo[0].authorId === id));
        });
        dataLoaders.set(info.fieldNodes, dataLoader);
    }
    return dataLoader;
};

export const userSubscribedToLoader = (
    info: GraphQLResolveInfo,
    { dataLoaders, prisma }: Context,
) => {
    let dataLoader = dataLoaders.get(info.fieldNodes);
    if (!dataLoader) {
        dataLoader = new DataLoader(async (ids: readonly string[]) => {
            const foundElements = await prisma.user.findMany({
                where: {
                    subscribedToUser: {
                        some: {
                            subscriberId: { in: [...ids] },
                        },
                    },
                },
                include: {
                    subscribedToUser: true,
                },
            });
            return ids.map((id) => foundElements.filter((user) => user.subscribedToUser[0].subscriberId === id));
        });
        dataLoaders.set(info.fieldNodes, dataLoader);
    }
    return dataLoader;
};
