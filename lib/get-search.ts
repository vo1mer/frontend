import { gql } from 'graphql-request';
import graphQLClient from './graph-client';

const getSearch = async () => {
	const query = gql`
		query getSearch($query: String!){
			search(query: $query, type: REPOSITORY, first: 10) {
				repositoryCount
				edges {
					node {
						... on Repository {
							name
							updatedAt
						}
					}
				}
			}
		}
	`;

	const variables = {
		query: '',
	};

	const response = await graphQLClient.request(query, variables);
	const data = JSON.parse(JSON.stringify(response));

	return data.user;
};

export default getSearch;