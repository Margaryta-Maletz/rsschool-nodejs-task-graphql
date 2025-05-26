import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {graphql, GraphQLSchema, parse, validate} from 'graphql';
import { rootQueryType } from './rootQueryType.js';
import { mutationType } from './mutationType.js';
import { Context } from './types/interfaces.js';
import depthLimit from 'graphql-depth-limit';

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
      const context: Context = { prisma, dataLoaders: new WeakMap()};

      const errors = validate(schema, parse(query), [depthLimit(5)]);

      if (errors.length > 0) {
        return { errors };
      }

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
  mutation: mutationType,
})

export default plugin;
