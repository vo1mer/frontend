import 'styles/globals.css';

import React, { useState } from 'react';
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from 'components/Header';

function MyApp({ Component, pageProps }: AppProps) {
	// create one instance for each page
	const [queryClient] = useState(() => new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 20 * 1000,
			},
		},
	}));

	return (
		<>
			<Head>
				<title>GithubUI</title>
				<meta name="description" content="New GithubUI project"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>

			<Header/>

			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<Component {...pageProps} />
				</Hydrate>
			</QueryClientProvider>
		</>
	);
}

export default MyApp;
