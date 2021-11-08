import React from 'react';

import styles from './styles.module.scss';

interface IReadmeSectionProps {
	text: string;
}

const ReadmeSection = ({ text }: IReadmeSectionProps) => (
	<div className={styles.repoReadmeSectionWrapper}>
		<h2>README:</h2>
		<div>{text}</div>
	</div>
);

export default ReadmeSection;