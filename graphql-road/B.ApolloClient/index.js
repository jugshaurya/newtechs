import ApolloClient, { gql } from 'apollo-boost';
import 'dotenv/config';
import 'cross-fetch/polyfill';

const printInDetail = (res) =>
  console.log(JSON.stringify(res, null, 4));

const GET_ORGANIZATION = gql`
  query($organization: String!) {
    organization(login: $organization) {
      name
      url

      repositories(first: 5) {
        edges {
          node {
            id
            url
            name
          }
        }
      }
    }
  }
`;

const ADD_STAR = gql`
  mutation AddStar($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const REMOVE_STAR = gql`
  mutation RemoveStar($repositoryId: ID!) {
    removeStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: (op) => {
    op.setContext({
      headers: {
        Authorization: `bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    });
  },
});

client
  .query({
    query: GET_ORGANIZATION,
    variables: { organization: 'facebook' },
  })
  .then((res) => printInDetail(res));

Promise.all([
  client.mutate({
    mutation: ADD_STAR,
    variables: { repositoryId: 'MDEwOlJlcG9zaXRvcnkxNjU4ODM=' },
  }),
  client.mutate({
    mutation: REMOVE_STAR,
    variables: { repositoryId: 'MDEwOlJlcG9zaXRvcnkxNjU4ODM=' },
  }),
]).then(([val1, val2]) => {
  printInDetail(val1);
  printInDetail(val2);
});
