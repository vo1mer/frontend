import React from 'react';
import { LangEdge } from 'lib/generated/graphql';

import styles from './styles.module.scss';

type LangPercentage = Record<string, { size: number; color: string } | number>

interface ILanguagesProps {
	edges: LangEdge[];
}

const Languages = ({ edges }: ILanguagesProps) => {

	const langObj = Object.values(edges).reduce((acc, value) => {
		acc[value.node.name] = {
			color: value?.node?.color,
			size: value?.size,
		};

		if (!acc.total) {
			acc.total = 0;
		}
		acc.total = acc.total as number + value.size;

		return acc;
	}, {} as LangPercentage);

	return (
		<div className={styles.languagesWrapper}>
			<h3>Languages</h3>

			{!edges.length && (
				<span className="block my-4">No data =(</span>
			)}

			{!!Object.keys(langObj).length && (
				<>
					<div className={styles.languagesSchema}>
						{Object.entries(langObj).map(([key, value]) => {
							if (typeof value !== 'number') {
								return (
									<div
										key={`${key}-line`}
										style={{
											width: `${(value.size * 100 / (langObj.total as number)).toFixed(2)}%`,
											backgroundColor: value.color,
										}}
									/>
								);
							}
						})}
					</div>

					<div>
						{Object.entries(langObj).map(([key, value]) => {
							if (typeof value !== 'number') {
								return (
									<div key={`${key}-lang`} className={styles.languageDesc}>
										<div className={styles.langDot} style={{ backgroundColor: value.color }} />
										<span>{`${key} ${(value.size * 100 / (langObj.total as number)).toFixed(2)}%`}</span>
									</div>
								);
							}
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default Languages;