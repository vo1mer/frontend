import { gql } from "graphql-request";
import graphQLClient from './graph-client'


const getRepo = async () => {

	const repoQuery = gql`
      query getRepo($name: String!, $owner: String!){
          repository(name: $name, owner: $owner) {
              id
              name
              stargazerCount
              languages(first: 10) {
                  edges {
                      size
                      node {
                          color
                          name
                      }
                  }
              }
              object(expression: "master") {
                  ... on Blob {
                      text
                  }
                  ... on Commit {
                      history {
                          totalCount
                      }
                  }
              }
          }
      }
	`;

	const variables = {
		name: '',
		owner: '',
		expression: ''
	}

	const response = await graphQLClient.request(repoQuery, variables);
	const data = JSON.parse(JSON.stringify(response));

	return data.user;
};

export default getRepo;