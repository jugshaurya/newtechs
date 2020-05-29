const { GraphQLServer } = require('graphql-yoga');
// In-Memory DAtabase
let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];

const resolvers = {
  Query: {
    info: () => `This is my First GraphQL API`,
    feeds: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      const newLink = {
        id: `link-${links.length + 1}`,
        url: args.url,
        description: args.description,
      };
      links.push(newLink);
      return newLink;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql', // Schema
  resolvers,
});

server.start(() => {
  console.log('server Started on http://localhost:4000');
});
