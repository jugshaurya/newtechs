import React, { Component } from 'react';
import axios from 'axios';
import Error from './components/Error';

// Features:
// Query - Organization-repos-issues
// Mutation - Star/Unstar a repository

const ISSUE_QUERY = `
  query getIssuesOfRepoQuery(
    $organization: String!
    $repository: String!
    $cursor: String
  ) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        id
        name
        url
        viewerHasStarred
        stargazers {
          totalCount
        }
        issues(first: 5, after: $cursor) {
          edges {
            node {
              id
              title
              url
              reactions(last: 3) {
                edges {
                  node {
                    id
                    content
                  }
                }
              }
            }
          }
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  }
`;

const ADD_STAR_MUTATION = `
mutation AddStar($repositoryId: ID!) {
  addStar(input: { starrableId: $repositoryId }) {
    starrable {
      viewerHasStarred
    }
  }
}
`;

const REMOVE_STAR_MUTATION = `
mutation RemoveStar($repositoryId: ID!) {
  removeStar(input: { starrableId: $repositoryId }) {
    starrable {
      viewerHasStarred
    }
  }
}
`;

const axiosGithub = axios.create({
  baseURL: 'https://api.github.com/graphql',
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
    const [org, repo] = path.split('/');
    const { organization } = this.state;
    const cursor = organization?.repository.issues.pageInfo.endCursor;
    axiosGithub
      .post('', {
        query: ISSUE_QUERY,
        variables: { organization: org, repository: repo, cursor },
      })
      .then((result) => {
        const { data, errors } = result.data;
        if (!cursor) {
          return this.setState({
            organization: data?.organization,
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
                edges: [
                  ...organization.repository.issues.edges,
                  ...data.organization.repository.issues.edges,
                ],
              },
            },
          },
          errors,
        };
        this.setState(updatedStateWithMoreIssues);
      });
  };

  handleStarUnstar = (repositoryId, viewerHasStarred) => {
    const { organization } = this.state;
    axiosGithub
      .post('', {
        query: viewerHasStarred ? REMOVE_STAR_MUTATION : ADD_STAR_MUTATION,
        variables: { repositoryId },
      })
      .then((result) => {
        const { data, errors } = result.data;
        if (errors) return;
        const newViewerHasStarred = viewerHasStarred
          ? data.removeStar.starrable.viewerHasStarred
          : data.addStar.starrable.viewerHasStarred;
        const updatedStateWithHasStarred = {
          organization: {
            ...organization,
            repository: {
              ...organization.repository,
              viewerHasStarred: newViewerHasStarred,
              stargazers: {
                ...organization.repository.stargazers,
                totalCount:
                  organization.repository.stargazers.totalCount +
                  (newViewerHasStarred ? 1 : -1),
              },
            },
          },
        };
        this.setState(updatedStateWithHasStarred);
      });
  };

  render() {
    const { path, errors, organization } = this.state;

    return (
      <React.Fragment>
        <h2 className="app">GraphQL Github API</h2>
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
          <Error errors={errors} />
        ) : (
          <div className="result">
            {organization && (
              <React.Fragment>
                <div className="org">
                  Organizations:{' '}
                  <a
                    href={organization.url}
                    target="_blank"
                    rel="noopener noreferrer">
                    {organization.name}
                  </a>
                </div>

                <div className="repo">
                  Repo:{' '}
                  <a
                    href={organization.repository.url}
                    target="_blank"
                    rel="noopener noreferrer">
                    {organization.repository.name}
                  </a>
                  <button
                    onClick={() =>
                      this.handleStarUnstar(
                        organization.repository.id,
                        organization.repository.viewerHasStarred,
                      )
                    }>
                    {organization.repository.viewerHasStarred
                      ? 'Unstar'
                      : 'Star'}
                  </button>
                  {organization.repository.stargazers.totalCount}
                </div>

                <div className="issues">
                  <ul>
                    {organization.repository.issues.edges.map((issue) => {
                      return (
                        <li key={issue.node.id}>
                          <a href={issue.node.url}>{issue.node.title}</a>
                          <ul>
                            {issue.node.reactions.edges.map((reaction) => (
                              <li key={reaction.node.id}>
                                {reaction.node.content}
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    })}
                    <hr />
                    {organization.repository.issues.pageInfo.hasNextPage && (
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
