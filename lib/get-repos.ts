import { gql } from 'graphql-request';
import graphQLClient from './graph-client';


const getRepos = async () => {
	const reposQuery = gql`
		query getRepos($login: String!, $after: String, $before: String){
			user(login: $login) {
				repositories(first: 5, after: $after, before: $before, orderBy: {field: CREATED_AT, direction: DESC}) {
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
		login: process.env.NEXT_PUBLIC_DEFAULT_USER_NAME as string,
		after: null,
		before: null,
	};

	const response = await graphQLClient.request(reposQuery, variables);
	const data = JSON.parse(JSON.stringify(response));

	return data.user;
};

export default getRepos;