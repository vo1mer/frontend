import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { ReposEdgesNode } from '../../lib/generated/graphql';

import styles from '@/components/ReposList/styles.module.scss';

const RepoItem = ({ id, name }: ReposEdgesNode) => {
	return (
		<Link
			key={`repo-${id}`}
			href={`/repositories/${name}`}
		>
			<a className={classnames('flex align-center px-4 py-5 mb-4', styles.link)}>
				{name}
			</a>
		</Link>
	);
};

export default RepoItem;