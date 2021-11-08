import React from 'react';

import styles from './styles.module.scss';

interface IAboutRepoProps {
	name: string;
	stargazerCount: number;
	commitCount: number;
}

const RepoDetails = ({ name, stargazerCount, commitCount }: IAboutRepoProps) => (
	<div className={styles.repoDetailsWrapper}>
		{name && (
			<span className={styles.name}>{name}</span>
		)}

		<span className={styles.stargazerCount}>{`${stargazerCount} star/s`}</span>

		<span className={styles.commitCount}>{`${commitCount} commit/s`}</span>
	</div>
);

export default RepoDetails;