import React from 'react';
import Link from './Link';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        url
        description
        createdAt
        votes {
          id
          user {
            id
          }
        }
        postedBy {
          id
          name
        }
      }
    }
  }
`;
const _updateCacheAfterVote = (store, createVote, linkId) => {
  const data = store.readQuery({ query: FEED_QUERY });

  const votedLink = data.feed.links.find((link) => link.id === linkId);
  votedLink.votes = createVote.link.votes;

  store.writeQuery({ query: FEED_QUERY, data });
};

const LinkList = () => {
  return (
    <div className="links">
      <Query query={FEED_QUERY}>
        {({ error, loading, data }) => {
          if (error) return <h2>Error</h2>;
          if (loading) return <h2>Loading</h2>;
          const links = data.feed.links;
          return links.map((link, index) => (
            <Link
              key={link.id}
              link={link}
              index={index}
              updateStoreAfterVote={_updateCacheAfterVote}
            />
          ));
        }}
      </Query>
    </div>
  );
};

export default LinkList;
