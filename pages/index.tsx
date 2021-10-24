import Header from "components/Header";
import React from "react";
import ReposList from "@/components/ReposList";
import { dehydrate, QueryClient } from "react-query";
import getRepos from "../lib/get-repos";


const Home = () => {

  return (
    <div>
        <Header />

        <main className="container mx-auto">
          <ReposList />
        </main>
    </div>
  )
}

export async function getServerSideProps() {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("getRepos", getRepos, {
    staleTime: Infinity,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }
  }
}

export default Home
