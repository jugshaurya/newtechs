import React from 'react';
import timeDifferenceForDate from '../utils/timeDifferenceForDate';
import { AUTH_TOKEN } from '../constants';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const VOTES_MUTATION = gql`
  mutation VotesMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const Link = ({ link, index, updateStoreAfterVote }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const { description, url, votes, postedBy, createdAt, id } = link;

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <Mutation
            mutation={VOTES_MUTATION}
            variables={{ linkId: id }}
            update={(store, { data: { vote } }) =>
              updateStoreAfterVote(store, vote, id)
            }>
            {(voteMutation) => {
              return (
                <div className="ml1 gray f11" onClick={voteMutation}>
                  ▲
                </div>
              );
            }}
          </Mutation>
        )}
      </div>
      <div className="ml1">
        <div>
          {description} ({url})
        </div>
        <div className="f6 lh-copy gray">
          {votes.length} votes | by {postedBy ? postedBy.name : 'Unknown'}{' '}
          {timeDifferenceForDate(createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Link;
