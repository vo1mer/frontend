import React from 'react';
import Header from 'components/Header';
import { useRouter } from 'next/router';

import { useGetRepoQuery } from '../../lib/generated/graphql';
import graphQlClient from '../../lib/graph-client';
import type { NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import getRepo from '../../lib/get-repo';

interface ILangObj {
	total: number;
	items: {
		[key: string]: {
			color: string;
			size: number
		}
	};
}

const RepositoriesPage: NextPage = () => {
	const { query: { id: pageId } } = useRouter();

	const { data } = useGetRepoQuery(graphQlClient, {
		name: pageId as string, owner: process.env.NEXT_PUBLIC_DEFAULT_USER_NAME as string, expression: 'master',
	}, {
		select: resp => resp.repository,
		enabled: !!pageId,
	});

	const { data: readmeData } = useGetRepoQuery(graphQlClient, {
		name: pageId as string, owner: process.env.NEXT_PUBLIC_DEFAULT_USER_NAME as string, expression: 'master:README.md',
	}, {
		select: resp => resp.repository,
		enabled: !!pageId,
	});

	const langObj = data && Object.values(data?.languages?.edges).reduce((acc, value) => {
		acc.items[value.node.name] = {
			color: value?.node?.color,
			size: value?.size,
		};
		acc.total += value.size;

		return acc;
	}, { total: 0, items: {} } as ILangObj);

	const hasProperty = <T, Prop extends string>(obj: T, prop: Prop): obj is T & Record<Prop, unknown> => {
		if (!obj) {
			return false;
		}
		return Object.prototype.hasOwnProperty.call(obj, prop);
	};


	return (
		<div>
			<Header />

			<main className="container mx-auto px-4 md:px-0 custom-container">
				{data && (
					<div className="mx-auto flex rounded-md shadow-lg p-6 flex-col md:flex-row flex-wrap">
						<div className="flex flex-1 flex-col align-top border-b-2 md:border-b-0 mb-5 pb-4 md:mb-0">
							{data.name && (
								<span className="text-3xl pb-4">{data?.name}</span>
							)}

							<span className="text-lg block mb-4">{`${data.stargazerCount || 0} star/s`}</span>

							{hasProperty(data?.object, 'history') ? (
								<span className="text-lg">{`${data.object.history.totalCount} commit/s`}</span>
							) : (
								<span className="text-lg">0 commit/s</span>
							)}
						</div>

						<div className="flex flex-1 flex-col border-b-2 md:border-b-0 border-b-2 md:border-b-0">
							<div className="pb-4" style={{ width: '100%', maxWidth: '500px' }}>
								<h3 className="text-lg">Languages</h3>

								{langObj && !Object.keys(langObj.items).length && (
									<span className="block my-4">No data =(</span>
								)}

								{langObj && !!Object.keys(langObj.items).length && (
									<div className="flex flex-row align-middle mt-4 mb-2">
										{Object.entries(langObj.items).map(([key, value]) => {
											return (
												<div
													key={`${key}-line`}
													className="flex h-3 rounded-md"
													style={{
														width: `${(value.size * 100 / langObj.total).toFixed(2)}%`,
														backgroundColor: value.color as string,
													}}
												/>
											);
										})}
									</div>
								)}

								{langObj && !!Object.keys(langObj.items).length && (
									<div>
										{Object.entries(langObj.items).map(([key, value]) => {
											return (
												<div key={`${key}-lang`} className="relative pl-3">
													<div className="w-2 h-2 top-2 left-0 rounded-full absolute" style={{ backgroundColor: value.color as string }} />
													<span>{`${key} ${(value.size * 100 / langObj.total).toFixed(2)}%`}</span>
												</div>
											);
										})}
									</div>
								)}
							</div>
						</div>

						<div className="w-full mt-10 flex flex-col border-t-0 md:border-t-2">
							<h2 className="text-5xl self-center py-4">README:</h2>

							{hasProperty(readmeData?.object, 'text') ? (
								<div>{`${readmeData?.object.text}`}</div>
							) : (
								<div>Something wrong with README =(</div>
							)}
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

interface ISSP {
	params: {
		id: string
	};
}

export async function getServerSideProps({ params: { id } }: ISSP) {
	const queryClient = new QueryClient();
	await queryClient.fetchQuery('getRepo', () => getRepo(id), {
		staleTime: Infinity,
	});

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
		},
	};
}

export default RepositoriesPage;
