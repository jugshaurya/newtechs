import React, { Component } from 'react';
import axios from 'axios';
import ISSUE_QUERY from './query.graphql';

// Features:
// - Star/Unstar a repository

const axiosGithub = axios.create({
  baseUrl: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

class App extends Component {
  state = {
    path: 'facebook/create-react-app',
    organization: null,
    errors: null,
  };

  componentDidMount = () => {
    this.fetchIssues();
  };

  onChange = (event) => {
    this.setState({ path: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.fetchIssues();
  };

  handleMoreIssuesFetch = () => {
    this.fetchIssues();
  };

  fetchIssues = () => {
    const { path } = this.state;
    const [organization, repository] = path.split('/');
    const cursor = organization?.repository.issues.edges.pageInfo.endCursor;

    axiosGithub
      .post('', {
        query: ISSUE_QUERY,
        variables: { organization, repository, cursor },
      })
      .then((result) => {
        const { data, errors } = result.data;

        if (!cursor) {
          return this.setState({
            organization: data.organization,
            errors,
          });
        }

        const updatedStateWithMoreIssues = {
          organization: {
            ...organization,
            repository: {
              ...organization.repository,
              issues: {
                ...organization.repository.issues,
                edges: {
                  ...organization.repository.issues.edges,
                  ...data.organization.repository.issues.edges,
                },
              },
            },
          },
          errors,
        };
        this.setState(updatedStateWithMoreIssues);
      });
  };

  render() {
    const { path, errors, organization } = this.state;
    const { repository, issues } = organization;
    return (
      <React.Fragment>
        <h2 className="app">GraphQL</h2>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">Show open issues for https://github.com/</label>
          <input
            id="url"
            type="text"
            value={path}
            onChange={this.onChange}
            placeholder="organization/repository"
            style={{ width: '300px' }}
          />
          <button type="submit">Search</button>
        </form>
        <hr />
        {errors ? (
          <div className="error">
            Something is wrong {JSON.stringify(errors)}
          </div>
        ) : (
          <div className="result">
            {organization && (
              <React.Fragment>
                <div className="org">
                  Organizations:{' '}
                  <a href={organization.url} target="_blank">
                    {organization.name}
                  </a>
                </div>

                <div className="repo">
                  Repo:{' '}
                  <a href={repository.url} target="_blank">
                    {repository.name}
                  </a>
                </div>

                <div className="issues">
                  <ul>
                    {issues.edges.map((issue) => {
                      return (
                        <li key={issue.node.id}>
                          <a href={issue.node.url}>{issue.node.title}</a>
                          <ul>
                            {issue.node.reactions.edges.map((reaction) => (
                              <li key={reaction.id}>{reaction.content}</li>
                            ))}
                          </ul>
                        </li>
                      );
                    })}
                    <hr />
                    {issues.pageInfo.hasNextPage && (
                      <button onClick={this.handleMoreIssuesFetch}>
                        ..More..
                      </button>
                    )}
                  </ul>
                </div>
              </React.Fragment>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default App;
