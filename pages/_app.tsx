import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

import { useState } from 'react';
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';

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

			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<Component {...pageProps} />
				</Hydrate>
			</QueryClientProvider>
		</>
	);
}

export default MyApp;
