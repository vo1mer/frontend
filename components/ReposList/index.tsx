import React, { useState } from 'react';
import {
	GetReposQuery, GetSearchQuery,
	useGetReposQuery, useGetSearchQuery
} from "../../lib/generated/graphql";
import RepoItem from "@/components/RepoItem";

import graphQlClient from "../../lib/graph-client";

const ReposList = () => {

	const [enableReposFetch, setEnableReposFetch] = useState(true);
	const [endCursor, setEndCursor] = useState<string | null | undefined>(null);
	const [searchStr, setSearchStr] = useState<string>('');

	const searchQueryConst = 'user:'

	const {data: repos, isLoading: reposIsLoading} = useGetReposQuery<GetReposQuery, Error>(graphQlClient, {
		login: "Vo1mer", before: null, after: endCursor || null
	}, {
		keepPreviousData: true,
		enabled: enableReposFetch
	})

	const {data: searchRepos, isLoading: searchIsLoading} = useGetSearchQuery<GetSearchQuery, Error>(graphQlClient, {
		query: `${searchQueryConst}Vo1mer ${searchStr}`
	}, {
		keepPreviousData: false,
		enabled: !!searchStr
	})

	const prevPage = () => {
		setEndCursor(null)
	}
	const nextPage = () => {
		setEndCursor(repos?.user.repositories.pageInfo.endCursor)
	}

	return (
		<div className="mx-auto flex flex-col px-4 md:px-0">
			<div className="py-5 flex self-end">
				<input
					placeholder="Search here"
					className="shadow-md border border-gray-600 p-2"
					type="text"
					onChange={(e) => setSearchStr(e.target.value)} value={searchStr}
				/>
			</div>

			{!!searchRepos?.search.repositoryCount && (
				<div className="pb-5">
					<h1>Results:</h1>
					{searchRepos?.search?.edges?.map(edge => (
						<RepoItem
							key={`repo-${edge.node.name}`}
							id={edge?.node.name as string}
							name={edge?.node.name as string}
						/>
					))}
				</div>
			)}

			{reposIsLoading && <h1 className="mx-auto">LOADING ...</h1>}
			{searchIsLoading && <h1 className="mx-auto">SEARCHING ...</h1>}
			{!searchIsLoading && !searchRepos?.search.repositoryCount && searchStr && <h1 className="mx-auto">Sorry, have no result :_(</h1>}

			{repos?.user?.repositories.edges && !searchStr && (
				<>
					<div className="flex flex-col">
						{repos?.user?.repositories.edges?.map((repo) => (
							<RepoItem
								key={`repo-${repo.node.id}`}
								id={repo.node.id}
								name={repo.node.name}
							/>
						))}
					</div>

					<div className="flex my-4">

						<button
							className="shadow-md p-4 bg-gray-100 rounded hover:shadow-lg transition duration-200 ease-in-out mr-5"
							onClick={prevPage}
						>
							prev
						</button>

						<button
							className="shadow-md p-4 bg-gray-100 rounded hover:shadow-lg transition duration-500 ease-in-out ml-5"
							onClick={nextPage}
						>
							next
						</button>
					</div>
				</>

			)}

		</div>
	);
};

export default ReposList;