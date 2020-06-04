import React, { Component } from 'react';
import axios from 'axios';

// Features:
// - Star/Unstar a repository

const TITLE = 'React GraphQL GitHub Client';
const axiosGithub = axios.create({
  baseUrl: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

const getIssuesOfOrgRepo = () => {
  return ` 
    query ($organization: String!, repository: String!) {
      organization(login: $organization) {
        name
        url
        repository(name:$repository) {
          name
          url
          issues(last:5) {
            edges{
              node{
                id
                title
                url
              }
            }
          }
        }
      }
    }
  `;
};

class App extends Component {
  state = {
    path: '',
    organization: null,
    repository: null,
    issues: null,
    errors: null,
  };

  componentDidMount() {}

  onChange = (event) => {
    this.setState({ path: event.target.value });
  };

  onSubmit(event) {
    event.preventDefault();
    this.fetchIssues();
  }

  fetchIssues(organization, repository) {
    axiosGithub
      .post('', {
        query: getIssuesOfOrgRepo(),
        variables: { organization, repository },
      })
      .then((result) => {
        console.log(result);
        const { organization } = result.data.data;
        this.setState({
          organization,
          repository: organization.repository,
          issues: organization.repository.issues,
          errors: result.data.errors,
        });
      });
  }

  render() {
    const { path, errors, organization, repository, issues } = this.state;
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
        <div id="result">
          {organization && (
            <React.Fragment>
              <div>
                Organizations: {organization.name} === ({organization.url})
              </div>
              <div>
                Repo: {repository.name} === ({repository.url})
              </div>
              <div className="issues">
                <ul>
                  {issues.edges.map((issue) => {
                    return (
                      <li>
                        {issue.nodes.id} | {issue.nodes.title}|{' '}
                        {issue.nodes.url}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
