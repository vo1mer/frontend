import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { INavLink } from 'components/Header';

import styles from './styles.module.scss';


const NavLink = ({ url, name }: INavLink) => {
	const { pathname } = useRouter();

	return (
		<Link href={url}>
			<a className={classnames('p-2', pathname === url ? 'border-b-2 border-indigo-400' : '', styles.navLink)}>{name}</a>
		</Link>
	);
};

export default NavLink;