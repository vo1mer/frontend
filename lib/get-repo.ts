import { gql } from 'graphql-request';
import graphQLClient from './graph-client';

const getRepo = async (name: string) => {
	const repoQuery = gql`
		query getRepo($name: String!, $owner: String!, $expression: String!){
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
				object(expression: $expression) {
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
		name: name,
		owner: process.env.NEXT_PUBLIC_DEFAULT_USER_NAME,
		expression: 'master',
	};

	const response = await graphQLClient.request(repoQuery, variables);
	const data = JSON.parse(JSON.stringify(response));

	return data.user;
};

export default getRepo;