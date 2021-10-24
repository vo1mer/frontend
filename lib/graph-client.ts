import { GraphQLClient } from "graphql-request";

// export const endpoint = process.env.API_URL as String;

export const headers = {
	authorization: `Token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
}

const graphQlClient = new GraphQLClient( process.env.NEXT_PUBLIC_API_URL as string, {
	headers: headers
})

export default graphQlClient;