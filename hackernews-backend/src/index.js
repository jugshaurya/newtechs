const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
  Query: {
    info: () => `This is my First GraphQL API`,
    feeds: (parent, args, context) => context.prisma.links(),
  },

  Mutation: {
    post: (parent, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql', // Schema
  resolvers,
  context: { prisma },
});

server.start(() => {
  console.log('server Started on http://localhost:4000');
});
