import React from 'react';
import { dehydrate, QueryClient } from 'react-query';

import ProfileCard from 'components/ProfileCard';
import getProfile from '../../lib/get-profile';

const Profile = () => {
	return (
		<main className="container mx-auto px-4 md:px-0 custom-container">
			<ProfileCard />
		</main>
	);
};

export async function getServerSideProps() {
	const queryClient = new QueryClient();
	await queryClient.fetchQuery('getProfile', getProfile, {
		staleTime: Infinity,
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

export default Profile;
