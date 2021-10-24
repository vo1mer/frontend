import React from 'react';
import { useGetProfileQuery, } from "../../lib/generated/graphql";
import graphQlClient from "../../lib/graph-client";


const ProfileCard = () => {

	const { data, isLoading } = useGetProfileQuery(graphQlClient, {
		login: "Vo1mer"
	}, {
		keepPreviousData: true,
		select: resp => resp.user
		// enabled: enableReposFetch
	})



	const langList = data?.repositories?.edges?.reduce((acc, item) => {
		item?.node?.languages?.nodes?.map((i) => {
			// @ts-ignore
			acc.push(i)
		})

		return acc
	}, []);

	const langsCounts = langList?.reduce((acc: any, item: any) => {
		if (!acc[item.name]) {
			acc[item.name] = {
				count: 1,
				color: item?.color
			};
		} else {
			acc[item.name].count += 1;
		}

		acc['total'] += 1

		return acc
	}, {'total': 0});

	const langPercentage = langsCounts && Object.entries(langsCounts)?.reduce((acc: any, [key, value]: any) => {
		if (key !== 'total'){
			acc[key] = {
				percent: (value.count * 100 / langsCounts.total).toFixed(1),
				color: value.color
		};
		}

		return acc
	}, {});


	// @ts-ignore
	// @ts-ignore
	return (
		<>
			{isLoading && <h1 className="flex justify-center text-lg py-6">Loading ...</h1>}

			{data && (
				<div className='flex rounded-md shadow-lg p-6 flex-col md:flex-row'>

					<div className="flex flex-1 flex-col align-top border-b-2 md:border-b-0">
						{data.avatarUrl && (
							<img
								src={data?.avatarUrl}
								alt="profile_img"
								width={150}
								height={150}
							/>
						)}

						{data.name && (
							<span className="text-lg py-3">{data?.name}</span>
						)}
						{data.bio && (
							<span className="text-lg py-3">{data.bio}</span>
						)}
					</div>

					<div className="flex flex-1 flex-col">
						<span
							className="my-4 md:mb-4 md:mt-0"
						>
							{`${data?.contributionsCollection?.contributionCalendar?.totalContributions} contributions for last year`}
						</span>

						{langPercentage && (
							<ul className="flex flex-wrap">
								{Object.entries(langPercentage).map(([key, value]) => (
									<li
										key={`lang-${key}`}
										className="w-2/4 py-2"
										// @ts-ignore
										style={{color: value?.color as string}}
									>
										{/* @ts-ignore */}
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