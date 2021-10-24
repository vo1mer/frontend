import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import Head from "next/head";
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import { useState } from "react";

// const queryClient = new QueryClient({
// 	defaultOptions: {
// 		queries: {
// 			staleTime: 20 * 1000
// 		}
// 	}
// });


function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient({
	  defaultOptions: {
		  queries: {
			  staleTime: 20 * 1000
		  }
	  }
  }))

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
	)
}

export default MyApp
