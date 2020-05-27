import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <div className="fw7 mr4">Hacker News</div>
          <Link to="/" className="ml-1 no-underline black">
            All
          </Link>
          <div className="ml1">|</div>
          <Link to="/create" className="ml1 no-underline black">
            New-Submission
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
