import React from 'react';
// import styles from './styles.module.scss';
import Link from 'next/link';

const Header = () => {
    return (
        <div>
            <Link href="/">Home</Link>
            <Link href="/repositories">Repositories</Link>
        </div>
    );
};

export default Header;