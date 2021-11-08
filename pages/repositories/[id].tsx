import React from 'react';

import type { NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import getRepo from '../../lib/get-repo';
import RepositoryCard from 'components/RepositoryCard';

const RepositoryPage: NextPage = () => {
	return (
		<main className="container mx-auto px-4 md:px-0 custom-container">
			<RepositoryCard />
		</main>
	);
};

interface ISSP {
	params: {
		id: string
	};
}

export async function getServerSideProps({ params: { id } }: ISSP) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery('getRepo', () => getRepo(id), {
		staleTime: Infinity,
	});

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
		},
	};
}

export default RepositoryPage;
