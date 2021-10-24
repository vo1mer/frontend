import { gql } from "graphql-request";
import graphQLClient from './graph-client'


const getProfile = async () => {
	const query = gql`
      query getProfile($login: String!){
          user(login: $login) {
              id
              name
              avatarUrl
              bio
              contributionsCollection {
                  contributionCalendar {
                      totalContributions
                  }
              }
              repositories(first: 100) {
                  edges {
                      node {
                          languages(first: 10) {
                              nodes {
                                  name
                                  color
                              }
                          }
                      }
                  }
              }
          }
      }
	`;

	const variables = {
		login: 'Vo1mer',
	}

	const response = await graphQLClient.request(query, variables);
	const data = JSON.parse(JSON.stringify(response));

	return data;
};

export default getProfile;