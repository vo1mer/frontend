import React from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import ReadmeSection from 'components/RepositoryCard/ReadmeSection';
import RepoInfoSection from 'components/RepositoryCard/RepoInfoSection';
import Spinner from 'components/Spinner';
import { Repo, useGetRepoQuery } from 'lib/generated/graphql';
import graphQlClient from 'lib/graph-client';
import hasProperty from 'lib/hasProperty';

import styles from './styles.module.scss';

export interface IError {
	response: {
		errors: [
			{ message: string }
		]
	};
}

const RepositoryCard = () => {
	const { query: { id: pageId } } = useRouter();

	const { data: repoData, isLoading } = useGetRepoQuery<Repo, IError>(graphQlClient, {
		name: pageId as string, owner: process.env.NEXT_PUBLIC_DEFAULT_USER_NAME as string, expression: 'master',
	}, {
		select: resp => resp.repository,
		enabled: !!pageId,
	});

	const { data: readmeData, isLoading: isReadmeLoading } = useGetRepoQuery(graphQlClient, {
		name: pageId as string, owner: process.env.NEXT_PUBLIC_DEFAULT_USER_NAME as string, expression: 'master:README.md',
	}, {
		select: resp => resp.repository,
		enabled: !!pageId,
	});

	return (
		<div className={classnames(styles.cardWrapper, isLoading && styles.centerAll)}>
			{isLoading || isReadmeLoading && (
				<Spinner />
			)}

			{!isLoading && !isReadmeLoading && repoData && readmeData && (
				<>
					<RepoInfoSection
						name={repoData.name}
						stargazerCount={repoData.stargazerCount}
						totalCount={hasProperty(repoData.object, 'history') ? repoData.object.history.totalCount : 0}
						edges={repoData.languages.edges}
					/>

					<ReadmeSection
						text={hasProperty(readmeData.object, 'text') ? readmeData.object.text as string : 'Something wrong with README =('}
					/>
				</>
			)}
		</div>
	);
};

export default RepositoryCard;