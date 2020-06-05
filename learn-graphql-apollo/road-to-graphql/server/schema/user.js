import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    me: User
    users: [User!]!
    user(id: ID!): User
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]! # rather than returning message id's we will return the message to avoid more requests
    slug: String!
  }
`;
