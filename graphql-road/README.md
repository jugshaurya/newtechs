## Learn To GraphQL

- Section A ✔✔

  - ✔ using axios to resolve the graphql queries and mutation.
  - ✔ used : axios
  - run - got to Section A repo and run code there

- Section B ✔

  - ✔ Learning that Apollo Client with `Apollo-Boost`can also resolve graphql queries and mutation with being added to the view-layer(React.js).
  - ✔ Hence learning only the data-layer part @commandLine
  - ✔ used: apollo-boost, graphql
  - ✔ The apollo-boost package gives access to a zero-configuration Apollo Client, and the graphql package allows GraphQL queries, mutations, and subscriptions on both the client and server.
  - run - yarn start inside section B

- Section C

  - Adding React to connect viewLayer and data layer.
  - ✔ yarn add

    - apollo-client
    - apollo-link
    - apollo-link-http (used to configure the URI and additional network information once for an Apollo Client instance)
    - apollo-link-error
    - apollo-cache-inmemory (The apollo-cache-inmemory is a recommended cache (read also as: store or state) for your Apollo)
    - graphql
    - graphql-tag
    - react-apollo
    - @apollo/react-hooks

* Section D

  - Nodejs Backend with GraphQL and Apollo

  - The GraphQL query language is implemented as a reference implementation in JavaScript by Facebook, while Apollo Server builds on it to simplify building GraphQL servers in JavaScript.

    - apollo-server , apollo-server-express, express , graphql

  - The GraphQL schema provided to the Apollo Server is all the available data for reading and writing
    data via GraphQL.

  - Resolvers are functions that resolve data for your GraphQL schema fields.
  - The schema doesn’t define where the data comes from. This responsibility is handled by resolvers outside of the SDL.
  - When you define GraphQL type definitions, there must be conscious decisions about the types, relationships, structure and (non-null) fields.
  - Each top level query in your Query type has to have a resolver.
  - Resolver arguments: (parent , args, context, info ) // pac i // pacman install

    - parent : returns the previously resolved field.
    - args : returns the argument object passed to fields.
    - context: use to inject depedencies from the outside to resolver functions. passed to apollo-client
    - info: Isn’t used very often, because it only gives you internal information about the GraphQL request. It can be used for debugging, error handling, advanced monitoring, and tracking.

  - Note the extend statement on the Query and Mutation types. Since you have more than one of those types now, you need to extend the types.
