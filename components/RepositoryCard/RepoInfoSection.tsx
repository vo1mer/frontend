import React from 'react';
import { LangEdge } from 'lib/generated/graphql';
import RepoDetails from 'components/RepositoryCard/RepoDetails';
import Languages from 'components/RepositoryCard/Languages';

import styles from './styles.module.scss';

interface IRepoInfoSectionProps {
	name: string;
	stargazerCount: number;
	totalCount: number;
	edges: LangEdge[];
}

const RepoInfoSection = ({ name, stargazerCount, totalCount, edges }: IRepoInfoSectionProps) => {
	return (
		<div className={styles.repoInfoSectionWrapper}>
			<RepoDetails
				name={name}
				stargazerCount={stargazerCount}
				commitCount={totalCount}
			/>

			<Languages
				edges={edges}
			/>
		</div>
	);
};

export default RepoInfoSection;