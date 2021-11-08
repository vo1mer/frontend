import React from 'react';
import NavLink from 'components/NavLink';

export interface INavLink {
	url: string;
	name: string;
}

const navLinks: INavLink[] = [
	{
		url: '/',
		name: 'Home',
	},
	{
		url: '/profile',
		name: 'Profile',
	},
];

const Header = () => {
	return (
		<header className="px-4 md:px-0 mb-5 border-b-2 border-black py-4">
			<div className="container mx-auto flex align-middle justify-end custom-container">
				{navLinks.map(link => (
					<NavLink
						key={link.name}
						url={link.url}
						name={link.name}
					/>
				))}
			</div>
		</header>
	);
};

export default Header;