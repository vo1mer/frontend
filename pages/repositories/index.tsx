import type { NextPage } from 'next'
import HeadComponent from "components/Head";
import Header from "components/Header";

const RepositoriesPage: NextPage = () => {
    return (
        <div>
            <HeadComponent/>
            <Header />
            <main>
                /repositories page
            </main>
        </div>
    )
}

export default RepositoriesPage
