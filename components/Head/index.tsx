import React from 'react';
import Head from 'next/head'

const HeadComponent = () => {
    return (
        <Head>
            <title>GithubUI</title>
            <meta name="description" content="New GithubUI project" />
            <link rel="icon" href="../../public/favicon.ico" />
        </Head>
    );
};

export default HeadComponent;