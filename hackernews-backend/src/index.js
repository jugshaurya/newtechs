const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
  type Query{
    info: String!
  }
`;

const resolvers = {
  Query: {
    info: () => `This is my First GraphQL API`,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("server Started on http://localhost:4000");
});
