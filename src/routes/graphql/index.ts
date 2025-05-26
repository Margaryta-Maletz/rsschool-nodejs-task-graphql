import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { PrismaClient } from "@prisma/client";
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {graphql, GraphQLSchema} from 'graphql';
import { rootQueryType } from './rootQueryType.js';

export type Context = { prisma: PrismaClient };

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
      const context: Context = { prisma };

      return await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: context,
      })
    },
  });
};

export const schema = new GraphQLSchema({
  query: rootQueryType,
})

export default plugin;
