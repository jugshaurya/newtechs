## Backend

who loves web development and learning new technologies that make it even more enjoyable.

```cmd
mkdir hackernews-node
cd hackernews-node
yarn init -y

## after prisma yml/datamodel files
## - free demo database (AWS Aurora) that’s hosted in Prisma Cloud.
npx prisma deploy
npx prisma generate
yarn add prisma-client-lib

```

## Start the app

```
node src/index.js
```

#### Goal-

`GraphQL API for a Hacker News clone.`

`graphql-yoga`: Fully-featured GraphQL server with focus on easy setup, performance & great developer experience. It is built on top of Express, apollo-server, graphql-js and more.

`Prisma`: Prisma replaces traditional ORMs. Use the Prisma client to implement your GraphQL resolvers and simplify database access.

`GraphQL Playground`: “GraphQL IDE” that allows to interactively explore the functionality of a GraphQL API by sending queries and mutations to it. It’s somewhat similar to Postman which offers comparable functionality for REST APIs. Among other things, a GraphQL Playground…

- auto-generates a comprehensive documentation for all available API operations.
- provides an editor where you can write queries, mutations & subscriptions, with auto-completion(!) and syntax highlighting.
- lets you easily share your API operations.

## BuzzWords

- Root Types - defines the entry points for a GraphQL API.
- RootFields - fieleds of root types

  - Query

    ```js
      <!-- Backend -->
      type Query {
        user(id: ID!): User
      }

      type User{
        id: ID!,
        name: String!
      }

      <!-- Frontend -->
      query {
        user(id: "abc") {
          id
          name
        }
      }

    ```

  - Mutation
  - Subscription

- Resolver

  - This is a JavaScript object that mirrors the Query, Mutation and Subscription types and their fields from your application schema. Each field in the application schema is represented by a function with the same name in that object.

- Fragments
- DataLoader
- typeDefs
  - These are the type definitions from your application schema.
- GraphQL Schema
- Context
  - This is an object that gets passed through the resolver chain and every resolver can read from or write to.

## Def

GraphQL requires you to `design a schema` which in turn defines the API of your server.

#### Defining schemas: The Schema Definition Language

- Defines the Structure of a `models` in your application.
- The GraphQLSchema object is the core of a GraphQL server
- Your development process is centered around a GraphQLSchema object, consisting of two major components:

- the schema definition
- the actual implementation in the form of resolver functions
- Note however when querying an object type, it is required that you query at least one of its fields in a selection set.
- **Not only root fields, but virtually all fields on the types in a GraphQL schema have resolver functions.** or every field inside the schema definition is backed by one resolver function whose responsibility it is to return the data for precisely that field.

- Effectively, everything the GraphQL server has to do is invoke all resolver functions for the fields that are contained in the query and then package up the response according to the query’s shape. Query resolution thus merely becomes a process of orchestrating the invocation of resolver functions!
