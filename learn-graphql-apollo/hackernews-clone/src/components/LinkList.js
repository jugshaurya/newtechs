import React from 'react';
import Link from './Link';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        url
        description
      }
    }
  }
`;

const LinkList = () => {
  return (
    <div className="links">
      <Query query={FEED_QUERY}>
        {({ error, loading, data }) => {
          if (error) return <h2>Error</h2>;
          if (loading) return <h2>Loading</h2>;
          const links = data.feed.links;
          return links.map((link) => <Link key={link.id} link={link} />);
        }}
      </Query>
    </div>
  );
};

export default LinkList;
