import type { NextPage } from 'next'
import HeadComponent from "components/Head";
import Header from "components/Header";

const Home: NextPage = (props) => {
    console.log(props)
  return (
    <div>
        <HeadComponent/>
        <Header />

        <main>
            / page
        </main>
    </div>
  )
}

export default Home
