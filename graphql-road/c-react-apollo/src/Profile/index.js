import React from 'react';
// import { Query } from "react-apollo";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const MY_REPOS = gql`
  {
    viewer {
      login
      name
      repositories(
        first: 10
        orderBy: { direction: DESC, field: STARGAZERS }
        privacy: PUBLIC
      ) {
        edges {
          node {
            id
            name
            stargazers {
              totalCount
            }
            watchers {
              totalCount
            }
            viewerHasStarred
            viewerSubscription
            descriptionHTML
            owner {
              login
              url
            }
            languages(first: 10) {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Profile = () => {
  const { data, loading, errors } = useQuery(MY_REPOS);
  if (loading) return <div className="loading">...Loading...</div>;
  if (errors) return <div className="loading">{errors.join(' ')}</div>;
  console.log(data, loading, errors);
  const { viewer } = data;
  return (
    <div className="Profile">
      {viewer.name} | {viewer.login}
    </div>
  );
};

export default Profile;
