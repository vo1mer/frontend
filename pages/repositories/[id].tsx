import type { NextPage } from 'next'
import Header from "components/Header";
import { useGetRepoQuery } from "../../lib/generated/graphql";
import graphQlClient from "../../lib/graph-client";
import { useRouter } from "next/router";
import React from "react";

const RepositoriesPage: NextPage = () => {
  const {query: { id: pageId }} = useRouter();


  const {data, isLoading} = useGetRepoQuery(graphQlClient, {
      name: pageId as string, owner: "Vo1mer", expression: "master"
    }, {
      select: resp => resp.repository,
      enabled: !!pageId
  })

  const {data: readmeData} = useGetRepoQuery(graphQlClient, {
      name: pageId as string, owner: "Vo1mer", expression: "master:README.md"
    }, {
      select: resp => resp.repository.object,
      enabled: !!pageId
  })

  console.log(readmeData)

  // @ts-ignore
  const langObj = data && Object.entries(data?.languages.edges).reduce((acc, [key, value]) => {
    // @ts-ignore
    acc[value?.node?.name] = {
      // @ts-ignore
      color: value?.node?.color,
      // @ts-ignore
      size: value?.size,
    }
    // @ts-ignore
    acc["total"] += value.size

    return acc;
  }, {total: 0})

  // @ts-ignore
  return (
    <div>
      <Header/>

      <main className="container mx-auto px-4 md:px-0">
        {data && (
          <div className='container mx-auto flex rounded-md shadow-lg p-6 flex-col md:flex-row flex-wrap'>
            <div className="flex flex-1 flex-col align-top border-b-2 md:border-b-0 mb-5 pb-4 md:mb-0">

              {data.name && (
                <span className="text-3xl pb-4">{data?.name}</span>
              )}

              <span className="text-lg">{`${data.stargazerCount} star/s`}</span>
            </div>

            <div className="flex flex-1 flex-col border-b-2 md:border-b-0">
              <div className="pb-4" style={{width: '100%', maxWidth: '500px'}}>
                <h3 className="text-lg">Languages</h3>

                <div className="flex flex-row align-middle mt-4 mb-2">
                  {/* @ts-ignore */}
                  {Object.entries(langObj).map(([key, value]) => {
                    if (key === 'total') {
                      return ''
                    }
                    return (
                      <div
                        key={`${key}-line`}
                        className="flex h-3 rounded-md"
                        style={{
                          // @ts-ignore
                          width: `${(value.size * 100 / langObj.total).toFixed(2)}%`,
                          // @ts-ignore
                          backgroundColor: value.color as string
                        }}
                      />
                    )

                  }) }
                </div>

                <div>
                  {/* @ts-ignore */}
                  {Object.entries(langObj).map(([key, value]) => {
                    if (key === 'total') {
                      return ''
                    }
                    return (
                      <div key={`${key}-lang`} className="relative pl-3">
                        {/* @ts-ignore */}
                        <div className="w-2 h-2 top-2 left-0 rounded-full absolute" style={{backgroundColor: value.color as string}} />
                        {/* @ts-ignore */}
                        <span>{`${key} ${(value.size * 100 / langObj.total).toFixed(2)}%`}</span>
                      </div>
                    )

                  }) }
                </div>
              </div>
            </div>

            {readmeData && (
              <div className="w-full mt-10 flex flex-col">
                <h2 className="text-5xl self-center py-4">README:</h2>
                {/* @ts-ignore */}
                <div>{readmeData.text}</div>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  )
}

export default RepositoriesPage
