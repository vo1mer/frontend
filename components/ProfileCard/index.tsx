import React from 'react';
import Image from 'next/image';

import { LangNode, useGetProfileQuery } from '../../lib/generated/graphql';
import graphQlClient from '../../lib/graph-client';

interface LangsCount {
	total: number;
	items: {
		[key: string]: {
			count: number;
			color: string;
		}
	};
}

interface LangPercentage {
	[key: string]: {
		percent: number;
		color: string;
	};
}

const ProfileCard = () => {
	const { data, isLoading } = useGetProfileQuery(graphQlClient, {
		login: process.env.NEXT_PUBLIC_DEFAULT_USER_NAME as string,
	}, {
		keepPreviousData: true,
		select: resp => resp.user,
	});

	const langList = data?.repositories?.edges?.reduce((acc: LangNode[], item) => {
		item?.node?.languages?.nodes?.map((i) => {
			acc.push(i);
		});

		return acc;
	}, []);

	const langsCounts = langList?.reduce((acc, item: LangNode) => {
		if (!acc.items[item.name]) {
			acc.items[item.name] = {
				count: 1,
				color: item?.color,
			};
		} else {
			acc.items[item.name].count += 1;
		}

		acc['total'] += 1;

		return acc;
	}, { 'total': 0, items: {} } as LangsCount);

	const langPercentage = langsCounts && Object.entries(langsCounts.items)?.reduce((acc: LangPercentage, [key, value]) => {
		if (key !== 'total') {
			acc[key] = {
				percent: +(value.count * 100 / langsCounts.total).toFixed(1),
				color: value.color,
			};
		}

		return acc;
	}, {});

	return (
		<>
			{isLoading && <h1 className="flex justify-center text-lg py-6">Loading ...</h1>}

			{data && (
				<div className="flex rounded-md shadow-lg p-6 flex-col md:flex-row">
					<div className="flex flex-1 flex-col align-top border-b-2 md:border-b-0 items-center md:items-start">
						{data.avatarUrl && (
							<Image
								src={data.avatarUrl}
								alt="profile_img"
								width={150}
								height={150}
							/>
						)}

						{data.name && (
							<span className="text-lg py-3">{data.name}</span>
						)}
						{data.bio && (
							<span className="text-lg py-3">{data.bio}</span>
						)}
					</div>

					<div className="flex flex-1 flex-col">
						<span
							className="my-4 md:mb-4 md:mt-0"
						>
							{`${data.contributionsCollection.contributionCalendar.totalContributions} contributions for last year`}
						</span>

						{langPercentage && (
							<ul className="flex flex-wrap">
								{Object.entries(langPercentage).map(([key, value]) => (
									<li
										key={`lang-${key}`}
										className="w-2/4 py-2"
										style={{ color: value?.color as string }}
									>
										{`${key}: ${value.percent}%`}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default ProfileCard;