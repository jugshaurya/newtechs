import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();
app.use(cors());

const users = {
  1: {
    id: 1,
    name: 'Shaurya Singhal',
    messageIds: [1, 2],
  },
  2: {
    id: 2,
    name: 'Shaurya Singhal #2',
    messageIds: [3],
  },
  3: {
    id: 3,
    name: 'Shaurya Singhal #3',
    messageIds: [],
  },
};

const messages = {
  1: {
    id: 1,
    text: 'Learing GraphQL',
    userId: 1,
  },
  2: {
    id: 2,
    text: 'Learing Apollo',
    userId: 3,
  },
  3: {
    id: 3,
    text: 'Learing Next.js',
    userId: 2,
  },
};

const schema = gql`
  type Query {
    me: User
    users: [User!]!
    user(id: ID!): User

    messages: [Message!]!
    message(id: ID!): Message!
    # messages(userId: ID!): [Message!]!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]! # rather than returning message id's we will return the message to avoid more requests
    slug: String!
  }

  type Message {
    id: ID!
    text: String!
    user: User! # Instead of using an identifier and resolving the entities with multiple waterfall requests, you can use the User entity instead of User id reference
  }

  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    me: (parent, args, context) => context.me,
    users: () => Object.values(users),
    user: (parent, args) => users[args.id],

    messages: () => Object.values(messages),
    message: () => messages[args.id],
  },
  User: {
    slug: (parent) => parent.username.split(' ').join('-'),
    messages: (parent) =>
      parent.messageIds.map((messageId) => messages[messageId]),
  },
  Message: {
    user: (parent) => users[parent.userId],
  },

  Mutation: {
    createMessage: (parent, args, context) => {
      const id = Object.values(messages).length + 1; // can use uuid for unique ids
      const newMessage = {
        id,
        text: args.text,
        userId: context.me.id,
      };

      messages[id] = newMessage;
      users[me.id].messageIds.push(id);
      return newMessage;
    },
    deleteMessage: (parent, args) => {
      const { [id]: message, ...otherMessages } = messages;
      if (!message) return false;
      messages = otherMessages;
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8080 }, () => {
  console.log('Apollo server is runing at http://localhost:8080/graphql');
});
