import graphQLClient from './graph-client';
import { GetRepoDocument } from './generated/graphql';

const getRepo = async (name: string) => {

	const variables = {
		name: name,
		owner: process.env.NEXT_PUBLIC_DEFAULT_USER_NAME,
		expression: 'master',
	};

	try {
		const response = await graphQLClient.request(GetRepoDocument, variables);
		const data = JSON.parse(JSON.stringify(response));

		return data
	} catch (error) {
		const parsedError = JSON.parse(JSON.stringify(error));
		throw new Error(parsedError.response.errors[0].message)
	}
};

export default getRepo;