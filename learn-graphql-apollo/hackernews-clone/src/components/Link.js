import React from 'react';
import timeDifferenceForDate from '../utils/timeDifferenceForDate';
import { AUTH_TOKEN } from '../constants';

const Link = ({ link, index }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const _voteForLink = () => {};
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div className="ml1 gray f11" onClick={() => _voteForLink()}>
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length} votes | by{' '}
          {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
          {timeDifferenceForDate(link.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Link;
