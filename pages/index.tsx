import React from 'react';
import { dehydrate, QueryClient } from 'react-query';

import getRepos from 'lib/get-repos';
import ReposList from 'components/ReposList';

const Home = () => {
	return (
		<main className="container mx-auto custom-container">
			<ReposList />
		</main>
	);
};

export async function getServerSideProps() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery('getRepos', getRepos, {
		staleTime: Infinity,
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

export default Home;
