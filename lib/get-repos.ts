import { gql } from "graphql-request";
import graphQLClient from './graph-client'


const getRepos = async () => {

	const reposQuery = gql`
      query getRepos($login: String!, $after: String, $before: String){
          user(login: $login) {
              repositories(first: 3, after: $after, before: $before, orderBy: {field: CREATED_AT, direction: DESC}) {
                  edges {
                      node {
                          id
                          name
                      }
                  }
                  pageInfo {
                      endCursor
                      startCursor
                      hasNextPage
                      hasPreviousPage
                  }
              }
          }
      }
	`;

	const variables = {
		login: 'Vo1mer',
		after: null,
		before: null
	}

	const response = await graphQLClient.request(reposQuery, variables);
	const data = JSON.parse(JSON.stringify(response));

	return data.user;
};

export default getRepos;